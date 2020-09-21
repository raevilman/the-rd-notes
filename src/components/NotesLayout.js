import React from "react";
import Layout from "../components/Layout";
import Content from "../components/Content";
import NoteFeedback from "./NoteFeedback";
import { BasicLoadCounter } from "react-events-counter";

function NotesLayout({ children, frontmatter }) {
  return (
    <>
      <Layout title={frontmatter.title}>
        <div className="flex justify-between text-invert">
          <div>
            <h1>{frontmatter.title}</h1>
          </div>
          <div className="flex flex-col justify-end items-end text-sm">
            <BasicLoadCounter
              assetId={frontmatter.slug}
              eventId="page-views"
              stepBy={1}
              // dryRun={true}
              text="Views: &nbsp;"
            />
            <div>
              <p>{frontmatter.date_modified}</p>
            </div>
          </div>
        </div>
        <Content>{children}</Content>
        <NoteFeedback frontmatter={frontmatter} />
      </Layout>
    </>
  );
}

//   NotesLayout.propTypes = {
//     children: PropTypes.node.isRequired,
//     title: PropTypes.string.isRequired,
//   };

export default NotesLayout;
