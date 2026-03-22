export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env("CLIENT_URL"),
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid).findOne({ documentId });

        console.log(uid)
        console.log(document)

        switch (uid) {
          case "api::page.page": return `${env('CLIENT_URL')}/${document.slug}`
          case "api::poem.poem": return `${env('CLIENT_URL')}/ode/${document.slug}`
          case "api::category.category": return `${env('CLIENT_URL')}/odes/${document.slug}`
          case "api::podcast-episode.podcast-episode": return `${env('CLIENT_URL')}/podcast/${document.slug}`
          case "api::post.post": return `${env('CLIENT_URL')}/post/${document.slug}`
          case "api::homepage.homepage": return `${env('CLIENT_URL')}/`
          default: return `${env('CLIENT_URL')}/`
        }
      },
    }
  },
});
