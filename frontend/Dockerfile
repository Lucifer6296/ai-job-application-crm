# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

# Accept VITE_API_BASE_URL as build argument
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copy package files first for layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build for production
COPY . .
RUN npm run build

# ── Stage 2: Serve with Nginx ─────────────────────────────────────────────
FROM nginx:alpine AS runtime

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
