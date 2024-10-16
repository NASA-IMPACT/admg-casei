require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: process.env.NODE_ENV === "development" ? "" : `/casei`,
  siteMetadata: {
    title: `Catalog of Archived Suborbital Earth Science Investigations`,
    shortname: `NASA | CASEI`,
    description: `An inventory of NASA’s airborne and field campaigns for Earth Science`,
    author: `@developmentseed`,
  },
  plugins: [
    // google analytics
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [`${process.env.GA_MEASUREMENT_ID}`],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },

    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `none`,
          backgroundColor: `white`,
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Catalog of Archived Suborbital Earth Science Investigations`,
        short_name: `NASA | CASEI`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
        theme_color_in_head: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/theme/typography`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: false,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: false, // you can disable scripts sha256 hashes
        mergeStyleHashes: false, // you can disable styles sha256 hashes
        mergeDefaultDirectives: false,
        directives: {
          "default-src": "'self' https://www.google-analytics.com data:",
          "script-src":
            "'unsafe-eval' 'unsafe-inline' 'self' *.earthdata.nasa.gov https://www.googletagmanager.com https://www.google-analytics.com https://fbm.earthdata.nasa.gov https://www.google.com/recaptcha https://www.gstatic.com/recaptcha https://fonts.gstatic.com",
          "style-src": "'unsafe-inline' 'self' data: *.earthdata.nasa.gov",
          "font-src": "data: 'self'",
          "img-src": "data: 'self' blob:",
          "frame-src": "*.earthdata.nasa.gov https://docs.google.com/",
          "worker-src": "'self' blob:",
          "child-src": "'self' blob:",
          "connect-src":
            process.env.NODE_ENV === "development"
              ? "'self' https://admg.nasa-impact.net https://www.google-analytics.com https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com http://localhost:* ws://localhost:*"
              : "'self' https://admg.nasa-impact.net https://www.google-analytics.com https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com https://admgstaging.nasa-impact.net/api/unpublished_drafts",
        },
      },
    },
  ],
}
