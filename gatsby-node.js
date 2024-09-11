const path = require(`path`)
const fs = require("fs")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `)

  result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        id: node.id, // Pass id instead of slug
      },
    })
  })
}

exports.onPostBuild = ({ reporter }) => {
  const publicPath = path.join(__dirname, "public")
  const sitemapIndexPath = path.join(publicPath, "sitemap-index.xml")

  if (fs.existsSync(sitemapIndexPath)) {
    let sitemapIndex = fs.readFileSync(sitemapIndexPath, "utf8")
    sitemapIndex = sitemapIndex.replace(
      /https:\/\/rapidread\.io\/sitemap-/g,
      "https://rapidread.io/blog/sitemap-"
    )
    fs.writeFileSync(sitemapIndexPath, sitemapIndex)
    reporter.info(`Updated sitemap-index.xml with correct URLs`)

    // Also update individual sitemap files
    const sitemapFiles = fs
      .readdirSync(publicPath)
      .filter(file => file.startsWith("sitemap-") && file.endsWith(".xml"))
    sitemapFiles.forEach(file => {
      if (file !== "sitemap-index.xml") {
        const sitemapPath = path.join(publicPath, file)
        let sitemapContent = fs.readFileSync(sitemapPath, "utf8")
        sitemapContent = sitemapContent.replace(
          /https:\/\/rapidread\.io\//g,
          "https://rapidread.io/blog/"
        )
        fs.writeFileSync(sitemapPath, sitemapContent)
        reporter.info(`Updated ${file} with correct URLs`)
      }
    })
  } else {
    reporter.warn(`sitemap-index.xml not found in ${publicPath}`)
  }
}
