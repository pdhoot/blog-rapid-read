import React from "react"
import { graphql } from "gatsby"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Seo from "../components/seo"
import Layout from "../components/layout"

const BlogPost = ({ data }) => {
  const post = data.contentfulBlogPost

  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <span className="font-semibold">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
          {children}
        </h3>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc list-inside mb-4 text-gray-700">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal list-inside mb-4 text-gray-700">
          {children}
        </ol>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-gray-500 pl-4 py-2 mb-4 italic text-gray-600">
          {children}
        </blockquote>
      ),
    },
  }

  return (
    <Layout
      pageTitle={post.title}
      //   pageDescription={post.excerpt || post.content.childMarkdownRemark.excerpt}
      //   pagePath={location.pathname}
      pageImage={post.featuredImage?.file.url}
      article={true}
    >
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mr-4">{post.author}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <time dateTime={post.publishedDate}>{post.publishedDate}</time>
          </div>
        </header>
        <div className="prose lg:prose-lg max-w-none text-gray-700">
          {post.content && renderRichText(post.content, options)}
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostById($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      author
      publishedDate(formatString: "MMMM DD, YYYY")
      content {
        raw
      }
    }
  }
`

export default BlogPost
