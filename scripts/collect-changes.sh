#!/usr/bin/env bash
set -euo pipefail

BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TODAY=$(date +%Y-%m-%d)

# --- Parse arguments ---
SINCE=""
while [[ $# -gt 0 ]]; do
    case "$1" in
        --since) SINCE="$2"; shift 2 ;;
        *) echo "Usage: $0 --since YYYY-MM-DD" >&2; exit 1 ;;
    esac
done

if [[ -z "$SINCE" ]]; then
    echo "Error: --since YYYY-MM-DD is required" >&2
    echo "Usage: $0 --since 2026-03-24" >&2
    exit 1
fi

# --- Configuration ---
declare -A GIT_REPOS
GIT_REPOS=(
    ["."]="Meta-Dokumentation (code-community)"
    ["bodo-os"]="Lernplattform Backend (Django)"
    ["crowdfund"]="Crowdfunding-Plattform"
    ["infrastructure"]="Infrastruktur (Ansible)"
    ["learn-IT-berlin"]="learn-IT-berlin (Laravel)"
    ["my-paths"]="Lernplattform Frontend (Vue)"
    ["organization"]="Organisation & Präsentation"
    ["bpw"]="Businessplan (BPW)"
    ["multiple-choice-app"]="WISO Quiz App"
    ["website/abschluss.jetzt"]="Website abschluss.jetzt"
    ["website/abschluss.coach"]="Website abschluss.coach"
    ["website/qm.abschluss.jetzt"]="QM-Handbuch"
)

declare -A NOGIT_DIRS
NOGIT_DIRS=(
    ["business"]="Geschäftsstrategie (vertraulich, kein Git)"
    ["packages"]="Shared Packages (kein eigenes Git)"
    ["non-profit"]="Non-Profit-Dokumente (kein Git)"
)

EXCLUDE_PATTERNS=(
    "node_modules" "dist" "build" "site" ".venv" "__pycache__"
    ".next" ".nuxt" ".shadowgit.git" ".git" ".DS_Store"
    "*.pyc" "*.pyo"
)

# --- Helper: build find exclude args ---
build_find_excludes() {
    local excludes=""
    for pat in "${EXCLUDE_PATTERNS[@]}"; do
        excludes="$excludes -name $pat -prune -o"
    done
    echo "$excludes"
}

# --- Output header ---
echo "# Changelog — ${SINCE} bis ${TODAY}"
echo ""
echo "> Generiert am ${TODAY} mit \`scripts/collect-changes.sh --since ${SINCE}\`"
echo ""

# --- Git repositories ---
echo "## Git-Repositories"
echo ""

no_changes=()

# Sort repos by label for consistent output
for repo_path in $(echo "${!GIT_REPOS[@]}" | tr ' ' '\n' | sort); do
    label="${GIT_REPOS[$repo_path]}"
    full_path="${BASE_DIR}/${repo_path}"

    # Skip if not a git repo
    if [[ ! -d "${full_path}/.git" ]]; then
        continue
    fi

    # Get commits since date
    commits=$(git -C "$full_path" log --since="$SINCE" --oneline --no-merges 2>/dev/null || true)

    if [[ -z "$commits" ]]; then
        no_changes+=("$label")
        continue
    fi

    commit_count=$(echo "$commits" | wc -l | tr -d ' ')
    authors=$(git -C "$full_path" log --since="$SINCE" --no-merges --format='%aN' 2>/dev/null | sort -u | paste -sd', ' -)

    echo "### ${label}"
    echo ""
    echo "**${commit_count} Commits** von ${authors}"
    echo ""

    # Show commits (max 15)
    shown=0
    while IFS= read -r line; do
        echo "- ${line}"
        shown=$((shown + 1))
        if [[ $shown -ge 15 ]]; then
            remaining=$((commit_count - shown))
            if [[ $remaining -gt 0 ]]; then
                echo "- *(+${remaining} weitere)*"
            fi
            break
        fi
    done <<< "$commits"

    echo ""
done

# List repos without changes
if [[ ${#no_changes[@]} -gt 0 ]]; then
    echo "### Repos ohne Änderungen"
    echo ""
    for label in "${no_changes[@]}"; do
        echo "- ${label}"
    done
    echo ""
fi

# --- Non-git directories ---
# Create a temp reference file for the --since date
ref_file=$(mktemp)
touch -t "$(date -j -f '%Y-%m-%d' "$SINCE" '+%Y%m%d0000' 2>/dev/null || date -d "$SINCE" '+%Y%m%d0000' 2>/dev/null)" "$ref_file" 2>/dev/null || {
    # Fallback: use perl for date conversion (works on macOS and Linux)
    perl -e "use POSIX; my \$t = POSIX::mktime(0,0,0,substr('$SINCE',8,2),substr('$SINCE',5,2)-1,substr('$SINCE',0,4)-1900); utime(\$t,\$t,'$ref_file')"
}

has_nogit_changes=false

for dir_path in $(echo "${!NOGIT_DIRS[@]}" | tr ' ' '\n' | sort); do
    label="${NOGIT_DIRS[$dir_path]}"
    full_path="${BASE_DIR}/${dir_path}"

    if [[ ! -d "$full_path" ]]; then
        continue
    fi

    # Find files newer than --since, excluding build artifacts
    changes=$(find "$full_path" \
        -name "node_modules" -prune -o \
        -name "dist" -prune -o \
        -name "build" -prune -o \
        -name "site" -prune -o \
        -name ".venv" -prune -o \
        -name "__pycache__" -prune -o \
        -name ".next" -prune -o \
        -name ".DS_Store" -prune -o \
        -name "*.pyc" -prune -o \
        -type f -newer "$ref_file" -print 2>/dev/null || true)

    if [[ -z "$changes" ]]; then
        continue
    fi

    if [[ "$has_nogit_changes" == false ]]; then
        echo "## Dateien ausserhalb von Git"
        echo ""
        has_nogit_changes=true
    fi

    echo "### ${label} (${dir_path}/)"
    echo ""

    while IFS= read -r filepath; do
        # Get relative path
        rel_path="${filepath#$BASE_DIR/}"
        # Get modification date
        mod_date=$(stat -f '%Sm' -t '%Y-%m-%d' "$filepath" 2>/dev/null || stat -c '%y' "$filepath" 2>/dev/null | cut -d' ' -f1)

        # Check if file was created after --since (approximate: compare mod date)
        # We can't reliably distinguish create vs modify on all filesystems,
        # so we use birthtime on macOS if available
        birth_date=$(stat -f '%SB' -t '%Y-%m-%d' "$filepath" 2>/dev/null || echo "")
        if [[ -n "$birth_date" && "$birth_date" > "$SINCE" ]]; then
            echo "- **NEU:** \`${rel_path}\` (${birth_date})"
        else
            echo "- **GEÄNDERT:** \`${rel_path}\` (${mod_date})"
        fi
    done <<< "$changes"

    echo ""
done

rm -f "$ref_file"

if [[ "$has_nogit_changes" == false ]]; then
    echo "## Dateien ausserhalb von Git"
    echo ""
    echo "*Keine Änderungen in Nicht-Git-Verzeichnissen gefunden.*"
    echo ""
fi
