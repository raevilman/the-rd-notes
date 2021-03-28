import React from "react";
import ExplorerBreadCrumbs from "./ExplorerBreadCrumbs";
import { Link } from "gatsby";

import Layout from "./Layout";
import "react-events-counter/dist/index.css";
import { FaRegFolder, FaRegFileAlt } from "react-icons/fa";

function NotesLayout({ children, currentPath, dirs, files }) {
  return (
    <>
      <Layout title="Notes Explorer">
        <div className="">
          <ExplorerBreadCrumbs currentPath={currentPath} />
          <div className="p-4 border border-gray-600 rounded-md flex flex-col gap-6 ">
            <div id="explorer" className="grid grid-cols-2 gap-4">
              {dirs.map((dir, index) => {
                return (
                  <>
                    <div id="dir" className=" flex gap-2 items-end ">
                      <FaRegFolder className="bg-yellow-200" />
                      <Link to={dir.name} className="">
                        <span className=" text-gray-900 text-lg">
                          {dir.name}
                        </span>
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
            {dirs.length>0 && files.length>0 && <hr class="border border-gray-200" />}
            <div id="explorer" className="gap-4">
              {files.map((file, index) => {
                const { title, slug } = file.node.frontmatter;
                return (
                  <>
                    <div id="file" className=" flex gap-3 items-center ">
                      <FaRegFileAlt className="" />
                      <Link to={slug} className="no-underline">
                        <span className=" text-gray-900 text-lg">{title}</span>
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

//   NotesLayout.propTypes = {
//     children: PropTypes.node.isRequired,
//     title: PropTypes.string.isRequired,
//   };

export default NotesLayout;
