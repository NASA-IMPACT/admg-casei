module.exports = {
  siteMetadata: {
    title: `CARA | NASA`,
    description: `A centralized airborne data inventory`,
    author: `@AliceR`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        delimiter: ";",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Airborne Inventory`,
        short_name: `CARA | NASA`,
        start_url: `/`,
        background_color: `#008888`,
        theme_color: `#008888`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `/favicons/android-chrome.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/apple-touch-icon.png`,
            sizes: `180x180`,
            type: `image/png`,
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-pg`,
      options: {
        connectionString: `postgres:///shakespeare`,
        // for example: `postgres://pg_user:pg_pass@pg_host:pg_port/pg_db?ssl=1`
        schema: `public`,
        graphiql: true, // make postgres show up in graphiql
        refetchInterval: 3600, // Refetch data every 1 hour
        appendPlugins: [require("postgraphile-plugin-connection-filter")],
      },
    },
  ],
}
