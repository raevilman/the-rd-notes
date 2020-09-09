import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Header from "./Header";

function Layout({ children, title }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== `undefined`) {
      return localStorage.getItem("theme") ? localStorage.getItem("theme") : "vanilla";
    }
  });

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`theme-${theme} bg-html text-default`}>
      <Helmet title={title} />
      <div className="w-full max-w-4xl mx-auto flex flex-col min-h-screen font-sans">
        <Header theme={theme} setTheme={setTheme} />
        <main className="flex-1 px-2 py-2">{children}</main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
