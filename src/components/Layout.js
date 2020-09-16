import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Header from "./Header";

function Layout({ children, title }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== `undefined`) {
      let themeLS = localStorage.getItem("theme") ? localStorage.getItem("theme") : "vanilla"
      return themeLS;
    } else {
      return "vanilla"
    }
  });
  const [themeName, setThemeName] = useState("theme-vanilla")

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    setThemeName(`theme-${theme}`)
  }, [theme]);

  return (
    <div className={`${themeName} bg-html text-default font-sans`}>
      <Helmet title={title} />
      <div className="w-full max-w-4xl mx-auto flex flex-col min-h-screen">
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
