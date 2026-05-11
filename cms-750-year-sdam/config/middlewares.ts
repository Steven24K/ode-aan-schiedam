export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'https://odeaanschiedam.nl'],
          'frame-ancestors': ["'self'", 'https://odeaanschiedam.nl', 'https://www.odeaanschiedam.nl', 'https://cms.odeaanschiedam.nl'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://odeaanschiedam.nl', 'market-assets.strapi.io'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://odeaanschiedam.nl'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      // Belangrijk: zet hier ALLE domeinen in die praten met de API
      origin: [
        'https://www.odeaanschiedam.nl', 
        'https://odeaanschiedam.nl', 
        'https://cms.odeaanschiedam.nl',
        'http://localhost:3000'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
