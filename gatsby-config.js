module.exports = {
  siteMetadata: {
    defaultTitle: `RapidRead`,
    titleTemplate: `%s | RapidRead`,
    defaultDescription: `Get daily insights with RapidRead, an AI-powered news feed tailored for CXOs, Founders, and Sales Leaders. Now, stay ahead of industry trends with customized content.`,
    siteUrl: `https://rapidread.io/blog`, // Correct blog base URL
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
        theme_color: `#007BFF`,
        display: `minimal-ui`,
        icon: `src/images/RapidRead logo 2.png`, // Ensure this favicon exists
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
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
            allContentfulBlogPost {
              nodes {
                slug
                updatedAt
              }
            }
          }
        `,
        resolveSiteUrl: () => `https://rapidread.io/blog`, // Set the correct site URL
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allContentfulBlogPost: { nodes: allPosts },
        }) => {
          // Create a Map of all blog post slugs to their updated dates
          const blogPostMap = new Map(
            allPosts.map(post => [post.slug, post.updatedAt])
          )

          // Process all pages
          const pages = allPages
            .filter(page => page.path !== "/") // Exclude homepage
            .map(page => {
              const path = page.path.endsWith("/")
                ? page.path.slice(0, -1)
                : page.path // Remove trailing slash
              const slug = path.replace(/^\//, "") // Remove leading slash
              return {
                path: slug,
                lastmod: blogPostMap.get(slug) || new Date().toISOString(),
              }
            })

          // Add blog homepage
          pages.push({
            path: "/",
            lastmod: new Date().toISOString(),
          })

          // Remove duplicates
          const uniquePages = Array.from(
            new Map(pages.map(page => [page.path, page])).values()
          )

          return uniquePages
        },
        serialize: ({ path, lastmod }) => {
          return {
            url: path,
            lastmod: lastmod,
          }
        },
      },
    },
  ],
}
