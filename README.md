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
- `docker-compose up --build`
- Open new terminal
- `cd cms-750-year-sdam`
- Copy `.env` file and fill in values
- `yarn install` or `yarn npm run install`
- `yarn dev` or `npm run dev`

### NextJS
- `cd next-750-year-sdam`
- Copy `.env` file and fill in values
- `yarn install` or `yarn npm run install`
- `yarn dev` or `npm run dev`


# Deploy 
*(incase you need to start a new process: `pm2 start yarn --name "<PROCESS NAME>" -- start`)*

Make sure the `.env` file is created for both CMS and NextJS App.

## Strapi CMS
- SSH into server
- `cd ode-aan-schiedam`
- `git pull`
- `cd cms-750-year-sdam`
- `yarn install`
- `yarn build`
- `pm2 restart strapi` 

## NextJS App
- `cd ..`
- `cd next-750-year-sdam`
- `yarn install`
- `yarn build`
- `pm2 restart next` 


# TODO shop checkout flow:
- Send order details to custom endpoint
- Store Printify Order in CMS -> return internal order ID
- Create payment request with Mollie, pass internal ID to Mollie Metadata, returns payment link
- Return payment link to client
- Redirect client back to webshop after payment (could be succes or fail). 
- Send order to Printify after succesfull payment in webhook
- E-mail customer with order summary. 
