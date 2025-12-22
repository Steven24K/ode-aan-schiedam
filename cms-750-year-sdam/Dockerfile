# Gebruik Node.js 22 LTS
FROM node:22.21.1-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json en lockfile
COPY package*.json ./
COPY yarn.lock ./
COPY .env .env

# Dependencies installeren met Yarn
RUN yarn install --frozen-lockfile

# Copy project
COPY . .

# Productie build
RUN yarn build

WORKDIR /usr/src/app

# Copy build en node_modules
COPY --from=builder /usr/src/app ./

# Expose Strapi poort
EXPOSE 1337

# Start Strapi
CMD ["yarn", "start"]
