## How to run it

```bash
cp infra/env/.env.example infra/env/.env   # fill in real values — every
                                            # blank field is required

# Dev — hot reload, source bind-mounted, ports open on localhost
nx run infra:dev
# or directly:
docker compose --env-file infra/env/.env -f infra/compose/docker-compose.yml -f infra/compose/docker-compose.dev.yml up --build

# Prod — built images, no source mounts, resource limits, read-only containers
nx run infra:prod
```
