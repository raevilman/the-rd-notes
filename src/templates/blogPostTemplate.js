import React from 'react';

export default ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;
    return (
      <div>
        <p>{frontmatter.date_modified}</p>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  };

export const query = graphql`
query PostsBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date_modified(formatString: "YYYY MMMM Do")
      }
    }
  }
`;