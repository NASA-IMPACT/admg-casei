require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: `/casei`,
  siteMetadata: {
    title: `Catalog of Archived Suborbital Earth Science Investigations`,
    shortname: `NASA | CASEI`,
    description: `An inventory of NASA’s airborne and field campaigns for Earth Science`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
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
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/edit/*`] },
    },
    // bundle analysis
    // `gatsby-plugin-perf-budgets`, // located at /_report.html
    // {
    //   resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
    //   options: {
    //     // devMode: true,
    //     // disable: true,
    //     analyzerPort: 8001,
    //   },
    // },
    // for csp headers
    // `gatsby-plugin-csp`,
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        // disableOnDev: true,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: false, // you can disable scripts sha256 hashes
        mergeStyleHashes: false, // you can disable styles sha256 hashes
        mergeDefaultDirectives: false,
        directives: {
          "default-src": "'self'",
          "script-src": "'unsafe-eval' 'unsafe-inline' 'self' *.earthdata.nasa.gov https://www.googletagmanager.com https://fbm.earthdata.nasa.gov https://www.google.com/recaptcha https://www.gstatic.com/recaptcha https://fonts.gstatic.com",
          "style-src": "'unsafe-inline' 'self' data: *.earthdata.nasa.gov",
          "font-src": "data: 'self'",
          "img-src": "data: 'self'",
          "frame-src": "*.earthdata.nasa.gov"
        },
      },
    },
  ],
}
