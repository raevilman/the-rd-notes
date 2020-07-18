import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

export default ({ data }) => {
  return (
    <>
      <Layout>
        <h1>Hi! I am RD 👋</h1>

        <p>I am building this blog using GatsbyJs fueled by Markdown files.</p>
        <p>
          If you wish to follow along the journey of building this blog step by step.
        </p>
        <p>
        I am documenting every step here 👉 <Link to="/building-a-markdown-blog">Building a Markdown Blog</Link>
        </p>

        <hr/>
        <h2>
        Recent Posts!
        </h2>
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
              <Link to={slug}>{title}</Link>
              <p>{description}</p>
              <br />
            </>
          );
        })}
      </Layout>
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
