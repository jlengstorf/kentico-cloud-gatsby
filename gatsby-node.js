const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allKenticoCloudItemBlog(
          sort: { fields: elements___post_date___datetime, order: DESC }
        ) {
          nodes {
            elements {
              title {
                value
              }
              post_slug {
                value
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allKenticoCloudItemBlog.nodes

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1]
      const next = index === 0 ? null : posts[index - 1]

      createPage({
        path: post.elements.post_slug.value,
        component: blogPost,
        context: {
          slug: post.elements.post_slug.value,
          previous,
          next,
        },
      })
    })

    return null
  })
}
