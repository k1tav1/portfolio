# Phase 2 DevOps Lab - Production Dockerfile
# Works with default Next.js output (no standalone needed)
# For high-performance standalone, build with: DOCKER_BUILD=1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Build with or without standalone based on env
# Default (Vercel compatible): no standalone
# For Docker standalone: docker build --build-arg DOCKER_BUILD=1 -t portfolio .
ARG DOCKER_BUILD
ENV DOCKER_BUILD=$DOCKER_BUILD
RUN npm run build

# Production image, copy all files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]

# For AWS DevOps Lab:
# docker build -t derick-portfolio .
# docker run -p 3000:3000 derick-portfolio
