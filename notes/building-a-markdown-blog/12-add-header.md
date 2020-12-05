---
title: '12. Adding a Header'
description: 'Lets add a header to our Gatsby blog'
slug: '/building-a-markdown-blog/add-header'
date_created: '2020-09-5'
date_modified: '2020-09-05'
author: 'RD'
is_published: true
show_in_recent: false
is_project: false
---
## Thoughts
I have been thinking of adding a header for some time. But I didn't want the typical header you see on every website with logo, site name and links to other parts of the website.  

On some site, there will be like hundreds of links waiting for you to hover your mouse cursor over.   

I wanted the top of my website to be clean and minimal and not having any distracting components. Just to enhance the reading experience.   

For now, I had just one requirement, to have site name on top, which can be used to navigate back to the home page.  

### Tutorial I followed
I am using tailwind.css so I followed a video tutorial from their website: [Building a Navbar Layout with Flexbox](https://tailwindcss.com/course/building-a-navbar-layout-with-flexbox)  

> Its a very nice tutorial I must say 👍

---

## Implementation
For my requirements, I added a new react component `Header.js` with following content.

```js
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

```

> Apart from the above said header component, there were multiple layout adjustments, which you can find in the GitHub commit page mentioned at the bottom of the page.  


## Why ellipsis button?

I have still coded an ellipsis button on top right of this website, which on click, reveals a hidden div with couple of placeholder links for now.  

But! I am gonna use this hidden place for adding utility buttons, which will let user modify reading environment like theme switcher, font style adjustments etc and I might change this ellipsis icon to settings icon at that time.  

--  
Thats all for this note.  
Have a good time ahead! TC.

---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/commit/8f875c3431293887e4fcfaf6a9fd492e713a867b) represents what we've done in this post 🤩
