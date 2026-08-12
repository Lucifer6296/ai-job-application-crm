# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

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

# Copy custom nginx config as a TEMPLATE so nginx envsubst runs at startup
# The official nginx image automatically runs envsubst on /etc/nginx/templates/*.template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built React app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Default BACKEND_URL for local Docker Compose (backend service hostname)
ENV BACKEND_URL=http://backend:8080

CMD ["nginx", "-g", "daemon off;"]
