import React, { useState } from "react";
import { Link } from "gatsby";

function Header({ currentPath }) {
  const dirNames = currentPath.split("/")
  const relativeDirNames = new Map(dirNames.map((dirName, index)=>{
    let contextRootParts = dirNames.slice(0, index);
    contextRootParts.push(dirName);
    return [dirName, contextRootParts.join('/')];
  }));
  
  return (
    <>
      <p className="">
        <Link to="/explorer/">Explorer</Link>
        {[...relativeDirNames].map(value => {
          return (
            <>
            <span>/</span><Link to={`/explorer/${value[1]}`}>{value[0]}</Link>
            </>
          );
        })}
        {/* <span className="font-mono text-gray-700">{currentPath}</span> */}
      </p>
    </>
  );
}

export default Header;
