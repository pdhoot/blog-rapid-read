/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    defaultTitle: `RapidRead`,
    titleTemplate: `%s | RapidRead`,
    defaultDescription: `Get daily insights with RapidRead, an AI-powered news feed tailored for CXOs, Founders, and Sales Leaders. Now, stay ahead of industry trends with customized content.`,
    siteUrl: `https://rapidread.io`,
    defaultImage: `/images/default-og-image.jpg`,
    twitterUsername: `@rapidread`,
    author: `Punit Dhoot`,
  },
  plugins: [
    `gatsby-plugin-image`,
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
        name: `RapidRead Blog`,
        short_name: `RapidRead`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        theme_color: `#007BFF`,
        display: `minimal-ui`,
        icon: `src/images/RapidRead logo 2.png`, // Make sure this favicon exists
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-postcss",
  ],
}
