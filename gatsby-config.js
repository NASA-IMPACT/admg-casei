require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Sub-orbital catalog`,
    description: `Sub-orbital catalog`,
    author: `@developmentseed`,
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
        name: `Sub-orbital catalog`,
        short_name: `Sub-orbital catalog`,
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
  ],
}
