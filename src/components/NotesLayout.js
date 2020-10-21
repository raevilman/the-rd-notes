import React from "react";
import Content from "../components/Content";
import Layout from "../components/Layout";

function NotesLayout({ children, frontmatter }) {
  return (
    <>
      <Layout title={frontmatter.title}>
        <div className="flex justify-between text-invert">
          <div>
            <h1>{frontmatter.title}</h1>
          </div>
        </div>
        <Content>{children}</Content>
      </Layout>
    </>
  );
}

//   NotesLayout.propTypes = {
//     children: PropTypes.node.isRequired,
//     title: PropTypes.string.isRequired,
//   };

export default NotesLayout;
