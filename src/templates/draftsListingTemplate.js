import React from "react";
import Layout from "../components/Layout";

export default ({ pageContext }) => {
  const { drafts } = pageContext;
  console.log(drafts);
  return (
    <>
      <Layout title="Drafts">
        <ul>
          {drafts.map((file) => {
            const { name, relativeDirectory } = file.node.parent;
            return (
              <>
                <div className="">
                  <li>
                    <span className="">{relativeDirectory}</span>
                    <ul>
                      <li>
                        <span className="">{name}</span>
                      </li>
                    </ul>
                  </li>
                </div>
              </>
            );
          })}
        </ul>
      </Layout>
    </>
  );
};
