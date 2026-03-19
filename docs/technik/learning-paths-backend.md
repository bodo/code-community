# Learning Paths — Backend (bodo-os)

Django REST Framework backend for the learning platform. Provides JWT-authenticated APIs for managing learning paths with progress tracking.

## Tech Stack

- Python 3.12+, Django 5.2, Django REST Framework 3.16
- Authentication: JWT (simplejwt) with custom claims
- Database: PostgreSQL (production), SQLite (development)
- Package manager: Poetry

## Data Model

```
LearningPath
  └── LearningPathStep (ordered)
        └── LearningPathStepBlock (ordered, type: text | image)

LearningPathProgress (per user per path)
  └── LearningPathStepProgress (per step: unstarted | in_progress | completed)

LearningPathEnrollment (M2M: users assigned to paths)
```

## API Endpoints

| Endpoint | Auth | Description |
| --- | --- | --- |
| `POST /api/auth/register/` | No | User registration |
| `POST /api/auth/token/` | No | JWT obtain |
| `POST /api/auth/token/refresh/` | No | JWT refresh |
| `GET /api/learning-paths/` | Optional | List paths (public + own) |
| `GET /api/learning-paths/{id}/` | Optional | Path detail with steps/blocks |
| `GET /api/learning-paths/public/` | No | Public paths only |
| `GET /api/learning-paths/assigned/` | Yes | Assigned to current user |
| `GET /api/learning-paths/started/` | Yes | Paths with progress |
| `GET /api/learning-paths/{id}/progress/` | Yes | Progress for a path |
| `POST /api/progress/` | Yes | Create/update progress |

## Permission Model

Two boolean flags on UserProfile:
- `can_create_learning_paths` — allows creating new paths
- `can_manage_all_learning_paths` — global admin (CRUD any path)

Ownership: path creator is owner; owners can update/delete own paths. Public paths visible to all; private paths require enrollment or ownership.

## Offline Sync (Planned)

RxDB-compatible sync endpoint (`/changes/`) for local-first offline support in the Vue frontend.

## Sources

- `../../bodo-os/CLAUDE.md` — Full tech stack and architecture overview
- `../../bodo-os/spec.md` — Original feature specification
- `../../bodo-os/BACKEND_API_GUIDE.md` — Complete HTTP API contract
- `../../bodo-os/docs/permissions.md` — Permission model details
- `../../bodo-os/docs/learning-path-management.md` — Path CRUD documentation
- `../../bodo-os/docs/learning-path-progress.md` — Progress tracking API
- `../../bodo-os/RX_DB_INSPIRATION.md` — RxDB sync design notes
