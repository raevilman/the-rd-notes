import React, { useState } from "react";
import { Link } from "gatsby";

function Header() {
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
              {!isMenuOpen && (
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
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
        } flex flex-col items-center sm:items-end`}
      >
        <Link
          href="#"
          className="block px-2 py-1 mt-1 font-semibold no-underline hover:underline"
        >
          About
        </Link>
        <Link
          href="#"
          className="block px-2 py-1 mt-1 font-semibold no-underline hover:underline"
        >
          Placeholder 1
        </Link>
        <Link
          href="#"
          className="block px-2 py-1 mt-1 font-semibold no-underline hover:underline"
        >
          Placeholder 2
        </Link>
      </div>
    </nav>
  );
}

export default Header;
