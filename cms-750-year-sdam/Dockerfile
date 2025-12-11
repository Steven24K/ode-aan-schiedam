# Gebruik Node.js 22 LTS
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json en lockfile
COPY package*.json ./

COPY .env.production .env

# Dependencies installeren
RUN npm install

# Copy project
COPY . .

# Productie build
RUN npm run build

# --- Production image ---
FROM node:22-alpine AS production

WORKDIR /usr/src/app

# Copy build en node_modules
COPY --from=builder /usr/src/app ./

# Expose Strapi poort
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
