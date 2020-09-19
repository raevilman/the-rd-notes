import React from "react";
import Layout from "../components/Layout";
import Content from "../components/Content";

function NotesLayout({ children, frontmatter }) {
  return (
    <>
      <Layout title={frontmatter.title}>
        <p className="text-sm  text-invert">{frontmatter.date_modified}</p>
        <h1 className="text-invert">{frontmatter.title}</h1>
        <Content>
            {children}
        </Content>
      </Layout>
    </>
  );
}

//   NotesLayout.propTypes = {
//     children: PropTypes.node.isRequired,
//     title: PropTypes.string.isRequired,
//   };

export default NotesLayout;
