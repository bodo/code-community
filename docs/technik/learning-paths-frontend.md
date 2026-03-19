# Learning Paths — Frontend (my-paths)

Vue 3 single-page application for learners to browse and track progress on learning paths. Offline-first architecture with RxDB for local caching.

## Tech Stack

- Vue 3 + TypeScript
- Vite (build tool)
- Tailwind CSS + DaisyUI
- RxDB (offline-first local database)
- Vue Router

## Features

- **Authentication** — JWT-based login/registration against the bodo-os Django API
- **Dashboard** — Overview of assigned and started learning paths
- **Learning Path Detail** — Step-by-step view with text and image blocks
- **Progress Tracking** — Mark steps as completed, track overall progress
- **Offline Caching** — RxDB stores paths and progress locally for offline access

## Integration with Backend

The frontend communicates with the bodo-os Django API (`/api/`). JWT tokens are obtained via `/api/auth/token/` and sent as `Authorization: Bearer` headers.

Future: RxDB sync with the backend's `/changes/` endpoint for seamless offline-to-online synchronization.

## Sources

- `../../my-paths/README.md` — Setup, scripts, and architecture overview
- `../../my-paths/BACKEND_API_GUIDE.md` — API contract for backend integration
