import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content from "../components/Content";
import Emoji from "../components/Emoji";

export default ({ data }) => {
  return (
    <div>
      <Layout title="theRDnotes">
        <section className="text-center">
          <h1 className="text-invert">Hey! <Emoji emoji="👋" label="wave"/></h1>
        </section>
        <Content>
        <section className="mt-12">
          <h3>Projects</h3>
          <div className="px-4 py-2">
            {data.allMarkdownRemark.edges.map((post) => {
              const {
                title,
                description,
                slug,
                is_project,
              } = post.node.frontmatter;
              return (
                is_project && (
                  <>
                    <Link to={slug}><p className="text-gray-900 text-xl">{title}</p></Link>
                    <p className="text-gray-700 text-sm">{description}</p>
                    <br />
                  </>
                )
              );
            })}
          </div>
        </section>
        <section>
          <h3>Series</h3>
          <div className="px-4 py-2">
            {data.allMarkdownRemark.edges.map((post) => {
              const {
                title,
                description,
                slug,
                date_modified,
                is_project,
                is_series
              } = post.node.frontmatter;
              return (
                !is_project && is_series && (
                  <>
                    <p className="text-xs">Last updated: {date_modified}</p>
                    <Link to={slug}><p className="text-xl">{title}</p></Link>
                    <p className="text-gray-700 text-sm">{description}</p>
                    <br />
                  </>
                )
              );
            })}
          </div>
        </section>
        <section>
          <h3> Recent notes!</h3>
          <div className="px-4 py-2">
            {data.allMarkdownRemark.edges.map((post) => {
              const {
                title,
                description,
                slug,
                date_modified,
                is_project,
                is_series
              } = post.node.frontmatter;
              return (
                !is_project && !is_series && (
                  <>
                    <p className="text-xs">{date_modified}</p>
                    <Link to={slug}><p className="text-gray-900 text-xl">{title}</p></Link>
                    <p className="text-gray-700 text-sm">{description}</p>
                    <br />
                  </>
                )
              );
            })}
          </div>
        </section>
        </Content>
      </Layout>
    </div>
  );
};

export const query = graphql`
  query SiteIndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date_modified], order: DESC}
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
            is_series
          }
        }
      }
    }
  }
`;
