const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`);

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(
      'src/templates/blogPostTemplate.js'
    );
  
    return graphql(`
      {
        allMarkdownRemark(filter: {frontmatter: {is_published: {eq: true}}}) {
            edges {
              node {
                frontmatter {
                  title
                  description
                  slug
                  date_modified
                  author
                  is_published
                }
              }
            }
          }
      }
    `).then(result => {
      if (result.errors) {
        throw result.errors;
      }
  
      const edges = result.data.allMarkdownRemark.edges;

      edges.forEach(post => {
        createPage({
            path: post.node.frontmatter.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.frontmatter.slug,
            },
          });
      })
  
      
    });
  };