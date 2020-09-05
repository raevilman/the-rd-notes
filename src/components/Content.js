import React from "react";

function Content({ children }) {
  return (
    <main className="px-4 py-4 sm:px-8 rounded bg-gray-100">{children}</main>
  );
}

Content.propTypes = {};

export default Content;
