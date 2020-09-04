import React from 'react';
import Layout from '../components/Layout';

export default ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;
    return (
      <Layout title={frontmatter.title}>
        <p>{frontmatter.date_modified}</p>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
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