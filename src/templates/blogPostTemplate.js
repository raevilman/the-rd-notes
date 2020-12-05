import React from 'react';
import NotesLayout from '../components/NotesLayout';

export default ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;
    return (
      <NotesLayout frontmatter={frontmatter}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </NotesLayout>
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