# Ode aan Schiedam
This repo contains the source code for:
*[odeaanschiedam.nl](https://odeaanschiedam.nl/)*

The repository is a mono repo containing: 
- Strapi CMs
- NextJS Web app
- CI/CD workflows

## Tech stack
- NodeJS (v18.20.4)
- Typescript
- Strapi
- NextJS and React
- Docker (Used for the Postgres database, development only.)

## Setup 
For local development you have to run both the CMS and the NextJS app. It is also possible to connect to the production CMS with an API key. 
If you setup Strapi locally you don't need one.

### Reccommended tools
- Docker: You can connect Strapi to a local Postgres instance if you want to, but Docker would make your life easier.
- NVM: (Node Version Manager) Helps swithing to different NodeJS versions on the command line.

### Strapi
- `cd cms-750-year-sdam`
- `yarn dev` or `npm run dev`

### NextJS
- `cd next-750-year-sdam`
- `yarn dev` or `npm run dev`

