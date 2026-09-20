 ARG NODE_VERSION=24.14.0-slim

  FROM node:${NODE_VERSION} AS dependencies

  # Set working directory
  WORKDIR /app

  # Copy package-related files first to leverage Docker's caching mechanism.
  # The pnpm workspace manifest must be present so monorepo installs can
  # honor workspace build scripts and dependency approvals.
  COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* pnpm-workspace.yaml .npmrc* ./

  # Install project dependencies with frozen lockfile for reproducible builds
  RUN --mount=type=cache,target=/root/.npm \
      --mount=type=cache,target=/usr/local/share/.cache/yarn \
      --mount=type=cache,target=/root/.local/share/pnpm/store \
    if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund; \
    elif [ -f yarn.lock ]; then \
      corepack enable yarn && yarn install --frozen-lockfile --production=false; \
    elif [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm install --frozen-lockfile; \
    else \
      echo "No lockfile found." && exit 1; \
    fi

  # ============================================
  # Stage 2: Build Next.js application in standalone mode
  # ============================================

  FROM node:${NODE_VERSION} AS builder

  # Set working directory
  WORKDIR /app

  # Copy project dependencies from dependencies stage
  COPY --from=dependencies /app/node_modules ./node_modules

  # Copy application source code
  COPY . .

  ENV NODE_ENV=production

  # Next.js collects completely anonymous telemetry data about general usage.
  # Learn more here: https://nextjs.org/telemetry
  # Uncomment the following line in case you want to disable telemetry during the build.
  ENV NEXT_TELEMETRY_DISABLED=1

  # Build the web app from its actual workspace directory.
  # The app script lives under apps/web rather than the repo root.
  RUN if [ -f package-lock.json ]; then \
      cd apps/web && npm run build; \
    elif [ -f yarn.lock ]; then \
      cd apps/web && corepack enable yarn && yarn build; \
    elif [ -f pnpm-lock.yaml ]; then \
      cd apps/web && corepack enable pnpm && pnpm build; \
    else \
      echo "No lockfile found." && exit 1; \
    fi

  # ============================================
  # Stage 3: Run Next.js application
  # ============================================

  FROM node:${NODE_VERSION} AS runner

  # Set working directory
  WORKDIR /app

  # Set production environment variables
  ENV NODE_ENV=production
  ENV PORT=3000
  ENV HOSTNAME="0.0.0.0"

  # Next.js collects completely anonymous telemetry data about general usage.
  # Learn more here: https://nextjs.org/telemetry
  # Uncomment the following line in case you want to disable telemetry during the run time.
  # ENV NEXT_TELEMETRY_DISABLED=1

  # Copy production assets from the app workspace.
  COPY --from=builder --chown=node:node /app/apps/web/public ./public

  # Set the correct permission for prerender cache
  RUN mkdir .next
  RUN chown node:node .next

  # Automatically leverage output traces to reduce image size.
  # Next.js emits the standalone app under apps/web/.next/standalone/apps/web,
  # so we copy that nested app to /app and start the server from there.
  COPY --from=builder --chown=node:node /app/apps/web/.next/standalone/apps/web ./
  COPY --from=builder --chown=node:node /app/apps/web/.next/static ./.next/static

  # If you want to persist the fetch cache generated during the build so that
  # cached responses are available immediately on startup, uncomment this line:
  # COPY --from=builder --chown=node:node /app/.next/cache ./.next/cache

  # Switch to non-root user for security best practices
  USER node

  # Expose port 3000 to allow HTTP traffic
  EXPOSE 3000

  # Start Next.js standalone server
  CMD ["node", "server.js"]