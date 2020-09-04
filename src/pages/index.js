import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

export default ({ data }) => {
  return (
    <div>
      <Layout title="theRDnotes">
        <section className="text-center">
          <h1>Hey! 👋</h1>
        </section>
        <section className="mt-12">
          <h3>Projects</h3>
          <div className="px-4 py-2">
            {data.allMarkdownRemark.edges.map((post) => {
              const {
                title,
                description,
                slug,
                author,
                date_modified,
                is_project,
              } = post.node.frontmatter;
              const excerpt = post.node.excerpt;
              return (
                is_project && (
                  <>
                    <Link to={slug}>{title}</Link>
                    <p className="text-gray-800">{description}</p>
                    <br />
                  </>
                )
              );
            })}
          </div>
        </section>
        <section>
          <h3> Recent Posts!</h3>
          <div className="px-4 py-2">
            {data.allMarkdownRemark.edges.map((post) => {
              const {
                title,
                description,
                slug,
                author,
                date_modified,
                is_project,
              } = post.node.frontmatter;
              const excerpt = post.node.excerpt;
              return (
                !is_project && (
                  <>
                    <p className="text-gray-600 text-xs">{date_modified}</p>
                    <Link to={slug}>{title}</Link>
                    <p className="text-gray-800">{description}</p>
                    <br />
                  </>
                )
              );
            })}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export const query = graphql`
  query SiteIndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date_modified]}
      filter: {
        frontmatter: {
          is_published: { eq: true }
          show_in_recent: { eq: true }
        }
      }
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
            is_project
          }
        }
      }
    }
  }
`;
