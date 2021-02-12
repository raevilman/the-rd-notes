import React from "react";
import NotesLayout from "../components/NotesLayout";

export default ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  return (
    <>
      <NotesLayout frontmatter={frontmatter} location={location}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </NotesLayout>
      <div className="flex justify-center gap-1 m-2 mb-4 ">
        <span className="text-gray-700">lets connect via</span>
        <a href="https://twitter.com/raevilman" target="_blank"  rel="noreferrer" className="">
          <span className="text-gray-800">twitter</span>
        </a>
      </div>
    </>
  );
};

export const query = graphql`
  query PostsBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        date_modified(formatString: "YYYY MMMM Do")
      }
    }
  }
`;
