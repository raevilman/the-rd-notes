import React from "react";

function Content({ children }) {
  return (
    <main className="px-4 py-4 sm:px-8 rounded bg-content">{children}</main>
  );
}

Content.propTypes = {};

export default Content;
