export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'https://www.odeaanschiedam.nl'],
          'frame-ancestors': ["'self'", 'https://www.odeaanschiedam.nl'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://www.odeaanschiedam.nl'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://www.odeaanschiedam.nl', 'https://cms.odeaanschiedam.nl'],
      methods: ['GET'],
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
