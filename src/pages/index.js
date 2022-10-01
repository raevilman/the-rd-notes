import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content from "../components/Content";
import Emoji from "../components/Emoji";
import { FaRegFileAlt, FaGithub, FaTwitter } from "react-icons/fa";

export default ({ data }) => {
  return (
    <div>
      <Layout title="theRDnotes">
        <div
          className="p-16 flex justify-center items-center bg-gray-100"
          style={{
            minHeight: `50vh`,
            borderRadius: `10px`,
            margin: `0.5rem`,
          }}
        >
          <div className="flex flex-col gap-8">
            <section className="border-l-2 border-orange-300 pl-2">
              <FaRegFileAlt />
              <Link to="/explorer">Notes Explorer</Link>
            </section>
            <div className="flex gap-6">
              <section className="border-l-2 border-gray-700 pl-2">
                <FaGithub />
                <a href="https://github.com/raevilman" target="_blank">
                  GitHub
                </a>
              </section>
              <section className="border-l-2 border-blue-400 pl-2">
                <FaTwitter />
                <a href="https://twitter.com/raevilman" target="_blank">
                  Twitter
                </a>
              </section>
            </div>
          </div>
        </div>
        <section>
          <h3> Recent posts!</h3>
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
                <>
                  <p className="text-gray-600 text-xs">{date_modified}
                  
                  { is_project && <span className="text-gray-700 text-xs ml-4">[Project]</span>}
                  </p> 
                  <Link to={slug}>{title}</Link> 
                  <p className="text-gray-800">{description}</p>
                  
                  <br />
                </>
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
      sort: { fields: [frontmatter___date_modified], order: DESC }
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
