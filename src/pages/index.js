import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allKenticoCloudItemBlog.nodes

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(post => {
          const title = post.elements.title.value
          return (
            <div key={post.elements.post_slug.value}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: `none` }}
                  to={post.elements.post_slug.value}
                >
                  {title}
                </Link>
              </h3>
              <small>{post.elements.post_date.value}</small>
              <p>{post.elements.description.value}</p>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allKenticoCloudItemBlog(
      sort: { fields: elements___post_date___datetime, order: DESC }
    ) {
      nodes {
        elements {
          title {
            value
          }
          description {
            value
          }
          post_date {
            value(fromNow: true)
          }
          post_slug {
            value
          }
        }
      }
    }
  }
`
