import React from "react";
import { graphql, Link } from "gatsby";

export default ({ data }) => {
  return (
    <>
      <div>
        {data.allMarkdownRemark.edges.map((post) => {
          const {
            title,
            description,
            slug,
            author,
            date_modified,
          } = post.node.frontmatter;
          const excerpt = post.node.excerpt;
          return (
            <>
              <p>{date_modified}</p>
              <Link to={slug}>
                <h2>{title}</h2>
              </Link>
              <p>{description}</p>
              <br />
            </>
          );
        })}
      </div>
    </>
  );
};

export const query = graphql`
  query SiteIndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date_modified], order: DESC }
      filter: { frontmatter: { is_published: { eq: true } } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            description
            slug
            date_modified
            author
            is_published
            show_in_recent
          }
        }
      }
    }
  }
`;
