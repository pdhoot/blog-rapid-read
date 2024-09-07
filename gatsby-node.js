const path = require(`path`)

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
