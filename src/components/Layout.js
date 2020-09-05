import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet"
import Header from "./Header";

function Layout({ children, title }) {
    return (
      <>
      <Helmet title={title} />
      <div className="w-full max-w-4xl mx-auto flex flex-col min-h-screen font-sans text-gray-900">
        <Header />
        <main className="flex-1 px-2 py-2">
          {children}
        </main>
      </div>
      </>
    );
  }
  
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  };
  
  export default Layout;