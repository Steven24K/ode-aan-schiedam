# Gebruik Node.js 24 LTS
FROM node:24.12.0-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json en lockfile
COPY package*.json ./
COPY yarn.lock ./

# Dependencies installeren met Yarn
RUN yarn install --frozen-lockfile

# Copy project
COPY . .
COPY .env.production .env

# Productie build
RUN yarn build

# --- Production image ---
FROM node:24.12.0-alpine AS production

WORKDIR /usr/src/app

# Copy build en node_modules
COPY --from=builder /usr/src/app ./

# Expose Next.js poort
EXPOSE 3000

# Start Next.js
CMD ["yarn", "start"]
