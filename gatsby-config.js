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
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
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
        refetchInterval: 60, // Refetch data every 60 seconds
      },
    },
  ],
}
