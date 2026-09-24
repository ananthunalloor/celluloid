FROM python:3.14-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update && apt-get install -y --no-install-recommends \
      libpq-dev \
      gcc \
    && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:0.9 /uv /uvx /usr/local/bin/

RUN addgroup --system app && adduser --system --ingroup app --home /app app
WORKDIR /app

FROM base AS deps-dev
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen

# ---------------------------------------------------------------------------
# dev — hot-reload target. Source is bind-mounted over this in compose, so
# what's COPYed here only matters for a one-off `docker run` with no mount.
# ---------------------------------------------------------------------------
FROM deps-dev AS dev
COPY --chown=app:app . .

ENV PATH="/app/.venv/bin:$PATH" \
    UV_CACHE_DIR=/tmp/uv-cache
USER app
EXPOSE 8000

CMD ["uv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]


FROM base AS deps-prod
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

# ---------------------------------------------------------------------------
# prod — gunicorn, non-root, no build toolchain, no dev dependencies
# ---------------------------------------------------------------------------
FROM python:3.14-slim AS prod

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:$PATH" \
    DJANGO_SETTINGS_MODULE=config.settings.prod

RUN apt-get update && apt-get install -y --no-install-recommends \
      libpq5 \
      curl \
    && rm -rf /var/lib/apt/lists/*

RUN addgroup --system app && adduser --system --ingroup app --home /app app
WORKDIR /app

COPY --from=deps-prod /app/.venv /app/.venv

COPY --chown=app:app . .

# Requires DJANGO_SECRET_KEY, DATABASE_URL, and DJANGO_ALLOWED_HOSTS to be
# present at build time
ARG DJANGO_SECRET_KEY=build-time-placeholder-not-used-at-runtime
RUN DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY DJANGO_ALLOWED_HOSTS=localhost \
    python manage.py collectstatic --noinput

USER app
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8000/healthz/ || exit 1

CMD ["gunicorn", "config.wsgi:application", \
     "--bind", "0.0.0.0:8000", \
     "--workers", "3", \
     "--timeout", "60", \
     "--access-logfile", "-", \
     "--error-logfile", "-"]
