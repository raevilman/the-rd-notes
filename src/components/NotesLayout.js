import React from "react";
import Content from "./Content";
import Layout from "./Layout";

function NotesLayout({ children, frontmatter, location }) {
  return (
    <>
      <Layout title={frontmatter.title}>
        <Content>{children}</Content>
        <Content>
          <h3>Helpful?</h3>
          <p>
            If you think this is helpful 🎈
            <br />
            Don't keep it to yourself 🙊 <br />
            <br />
            Share it with your <em>lovely</em> followers at{" "}
            <a
              href={
                "https://twitter.com/intent/tweet?text=Sharing an article I read, '" +
                frontmatter.title +
                "' by @raevilman &url=" +
                location.href
              }
              target="_blank"
              rel="noreferrer"
            >
              <span className="italic">twitter</span>
            </a>{" "}
            🗽
          </p>
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
