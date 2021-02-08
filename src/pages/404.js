import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content from "../components/Content";
import Emoji from "../components/Emoji";

export default ({ data }) => {
  return (
    <div>
      <Layout title="theRDnotes">
        <section className="text-center">
          <h1 className="text-invert">Hey! <Emoji emoji="👋" label="wave"/></h1>
        </section>
        
      </Layout>
    </div>
  );
};
