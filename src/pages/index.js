import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const BlogIndex = ({ data }) => {
  const posts = data.allContentfulBlogPost.edges

  return (
    <Layout
      pageTitle="Blog"
      pageDescription="Explore our latest blog posts on various topics."
      // pagePath={location.pathname}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ node }) => (
            <Link
              to={`/blog/${node.slug}`}
              key={node.slug}
              className="block group"
            >
              <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 border border-gray-200">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {node.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{node.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <time dateTime={node.publishedDate}>
                      {node.publishedDate}
                    </time>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { publishedDate: DESC }) {
      edges {
        node {
          title
          slug
          author
          publishedDate(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`

export default BlogIndex
