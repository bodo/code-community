# Learn IT Berlin

A minimal meetup clone for Berlin computer science learning events. Built with Laravel 12 and Livewire.

## Tech Stack

- Laravel 12 + Livewire
- Tailwind CSS v4 + DaisyUI
- PHP with Fortify authentication
- Deployment target: Laravel Cloud

## Core Concepts

### Roles

| Role | Capabilities |
| --- | --- |
| **User** | Sign in, RSVP events, add comments (require approval) |
| **TrustedUser** | Like User, but comments are public immediately |
| **Admin** | Create/delete groups, full TrustedUser capabilities |
| **Superuser** | Bypasses all role checks, manages Admin assignments |

### Groups & Events

- Events always belong to a Group
- Groups have owners, moderators, and members
- Events can be draft or published, with optional spot limits and waitlists
- Events have images, location, time (timezone-safe), and comments

### Features

- Public event feed with pagination, time filters, and fuzzy text search
- RSVP system (Going, Not Going, Interested) with waitlist promotion
- Comment moderation for non-trusted users
- Learning graphs (roadmaps) with interactive node-based visualization
- i18n: English and German
- Light/dark mode via DaisyUI

## Feature Modules

11 implementation modules cover the full feature set:
1. Roles system
2. Auth enhancements (profiles, 2FA)
3. Groups management
4. Events system
5. RSVP functionality
6. Comments & moderation
7. Feed & search
8. UI improvements
9. i18n/localization
10. Laravel Cloud setup
11. Learning graphs

## Sources

- `../../learn-IT-berlin/README.md` — Tech stack and feature overview
- `../../learn-IT-berlin/spec.md` — Original specification
- `../../learn-IT-berlin/instructions/README.md` — Implementation roadmap with 11 modules
- `../../learn-IT-berlin/docs/design-system.md` — Design system guidelines
