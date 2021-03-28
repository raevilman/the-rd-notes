import React from "react";
import { graphql } from 'gatsby';
import ExplorerLayout from "../components/ExplorerLayout";

export default ({ data, pageContext  }) => {
  const dirs = data.allDirectory.nodes;
  const files = data.allMarkdownRemark.edges;
  const { relDir } = pageContext
  console.log("dirs", dirs);
  console.log("files", files);

  return (
    <>
      <ExplorerLayout currentPath={relDir} dirs={dirs} files={files} />
    </>
  );
};

export const query = graphql`
  query DirListing($relDir: String) {
    allDirectory(filter: { relativeDirectory: { eq: $relDir } }) {
      nodes {
        relativeDirectory
        relativePath
        name
      }
    }
    allMarkdownRemark(
      filter: { fields: { relativeDirectory: { eq: $relDir } } }
      sort: {fields: frontmatter___order_in_series}
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;
