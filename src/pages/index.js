import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content from "../components/Content";
import Emoji from "../components/Emoji";
import { FaRegFileAlt, FaGithub, FaTwitter } from "react-icons/fa";

export default ({ data }) => {
  return (
    <div>
      <Layout title="theRDnotes">
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <div className="flex flex-col gap-8">
            <section className="border-l-2 border-orange-300 pl-2">
              <FaRegFileAlt />
              <Link to="/explorer">Notes Explorer</Link>
            </section>
            <div className="flex gap-6">
            <section className="border-l-2 border-gray-700 pl-2">
              <FaGithub />
              <a href="https://github.com/raevilman" target="_blank">
                GitHub
              </a>
            </section>
            <section className="border-l-2 border-blue-400 pl-2">
              <FaTwitter />
              <a href="https://twitter.com/raevilman" target="_blank">
                Twitter
              </a>
            </section>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
