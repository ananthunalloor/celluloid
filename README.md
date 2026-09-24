# Celluloid

A one-stop, worldwide movie, TV, and anime site: full catalog details,
where to watch, and reviews that stay honest — verified reviewers only,
no paid reviews, no review bombing.

This is an Nx monorepo.

- `apps/backend` — Django + DRF API (Python, managed with `uv`)
- `apps/web` — Next.js web app
- `apps/mobile` — Expo / React Native app
- `packages/*` — code shared between `web` and `mobile` (API types, validation, config)
- `infra/` — Docker Compose and reverse proxy config for local development and deployment
- `docs/` — the architecture plan and build roadmap

## Local development

```bash
cp infra/env/.env.example infra/env/.env
docker compose --env-file infra/env/.env -f infra/compose/docker-compose.yml up --build
```

The API runs at http://localhost:8000, the web app at http://localhost:3000.
