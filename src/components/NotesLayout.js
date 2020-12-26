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
        <Content>
          <h3>Helpful?</h3>
          <p>
          If you think this is helpful 🎈<br/>
          Don't keep it to yourself 🙊 <br/><br/>
          Share it with your <em>lovely</em> followers at <a href={'https://twitter.com/intent/tweet?text=Sharing an article I read, on \''+frontmatter.title+'\' by @raevilman &url='+window.location.href} target="_blank"><span className="italic">twitter</span></a> 🗽 
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
