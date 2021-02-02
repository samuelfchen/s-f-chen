import React from "react"

//Import component
import Layout from "../templates/Layout.js"
import PostLink from "../components/blog/PostLink"

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <h1>
        Blog Posts
      </h1>
      
      <div>{Posts}</div>
      
    </Layout>
  );
}

export default BlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`
