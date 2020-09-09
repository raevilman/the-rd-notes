import React, { useState } from "react";
import { Link } from "gatsby";

function Header({ theme, setTheme }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="">
      <div className="flex items-center justify-between px-2 py-3 ">
        <div className="">
          <h2>
            <Link className="no-underline" to="/">
              theRDnotes
            </Link>
          </h2>
        </div>
        <div className="">
          <button
            type="button"
            className="block text-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen && (
                <path
                  // cross
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
              {!isMenuOpen && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
                // <path
                // // ellipses
                //   stroke-linecap="round"
                //   stroke-linejoin="round"
                //   stroke-width="2"
                //   d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                // />
                // <path
                // // ham menu
                //   stroke-linecap="round"
                //   stroke-linejoin="round"
                //   stroke-width="2"
                //   d="M4 6h16M4 12h16M4 18h16"
                // />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${
          !isMenuOpen ? "hidden" : ""
        } flex justify-between flex-row-reverse items-center sm:items-end bg-content rounded px-8 py-4`}
      >
        <div className="flex flex-col">
          <span className="text-xl font-medium pb-2">Themes</span>
          <button
            type="button"
            onClick={() => setTheme("sunset")}
            className={` ${
              theme === "sunset" ? "bg-block" : ""
            } focus:outline-none`}
          >
            Sunset
          </button>
          <button
            type="button"
            onClick={() => setTheme("vanilla")}
            className={` ${
              theme === "vanilla" ? "bg-block" : ""
            } focus:outline-none`}
          >
            Vanilla
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
