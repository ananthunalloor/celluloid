ARG NODE_VERSION=24.14.0-slim

FROM node:${NODE_VERSION} AS deps
WORKDIR /repo

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/web/package.json apps/web/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    corepack enable pnpm && pnpm install --frozen-lockfile

FROM deps AS dev
COPY . .
WORKDIR /repo/apps/web
EXPOSE 3000
CMD ["pnpm", "exec", "next", "dev", "--turbopack", "-p", "3000"]

# ---------------------------------------------------------------------------
# builder — production build, standalone output
# ---------------------------------------------------------------------------
FROM deps AS builder
WORKDIR /repo
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN corepack enable pnpm && pnpm --filter @celluloid/web build

# ---------------------------------------------------------------------------
# prod — runs the standalone server only, no build toolchain, non-root
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS prod
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /repo/apps/web/public ./public
RUN mkdir .next && chown node:node .next
COPY --from=builder --chown=node:node /repo/apps/web/.next/standalone/apps/web ./
COPY --from=builder --chown=node:node /repo/apps/web/.next/static ./.next/static

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
