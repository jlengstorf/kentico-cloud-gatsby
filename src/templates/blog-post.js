import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.kenticoCloudItemBlog
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.elements.title.value}
          description={post.elements.description.value}
        />
        <h1>{post.elements.title.value}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.elements.post_date.value}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: post.elements.content.resolvedHtml,
          }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.elements.post_slug.value} rel="prev">
                ← {previous.elements.title.value}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.elements.post_slug.value} rel="next">
                {next.elements.title.value} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    kenticoCloudItemBlog(elements: { post_slug: { value: { eq: $slug } } }) {
      elements {
        title {
          value
        }
        post_date {
          value(fromNow: true)
        }
        description {
          value
        }
        content {
          resolvedHtml
        }
      }
    }
  }
`
