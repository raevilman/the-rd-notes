const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const dirName = path.posix.dirname(node.fileAbsolutePath);
    const relDirName = path.posix.relative('notes/', dirName);
    node.relativeDirectory
    createNodeField({
      node,
      name: `relativeDirectory`,
      value: relDirName,
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve("src/templates/blogPostTemplate.js");
  const notesDirTemplate = path.resolve("src/templates/notesDirTemplate.js");
  const draftsListingTemplate = path.resolve("src/templates/draftsListingTemplate.js");

  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { is_published: { eq: true } } }
      ) {
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
      drafts: allMarkdownRemark(
        filter: {frontmatter: {is_published: {eq: false}}}
      ) {
        edges {
          node {
            frontmatter {
              title
              slug
            }
            parent {
              ... on File {
                id
                name
                relativeDirectory
              }
            }
          }
        }
      }
      allDirectory {
        nodes {
          relativePath
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    const markEdges = result.data.allMarkdownRemark.edges;
    const drafts = result.data.drafts.edges;
    const dirs = result.data.allDirectory.nodes;

    console.log(drafts);
    // Generate blog posts
    markEdges.forEach((post) => {
      createPage({
        path: post.node.frontmatter.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.frontmatter.slug,
        },
      });
    });

    // Generate explorer pages
    dirs.forEach((dir) => {
      createPage({
        path: 'explorer/'+dir.relativePath,
        component: notesDirTemplate,
        context: {
          relDir: dir.relativePath,
        },
      });
    })

    // Generate drafts listing
    createPage({
      path: 'drafts/',
      component: draftsListingTemplate,
      context: {
        drafts: drafts,
      },
    });

    
  });
};
