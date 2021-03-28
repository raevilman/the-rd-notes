---
title: '6. layout using TailwindCSS'
description: 'creating minimal blog layout using TailwindCSS + PostCSS'
slug: '/building-a-markdown-blog/layout-using-tailwind'
date_created: '2020-07-18'
date_modified: '2020-07-18'
author: 'RD'
is_published: true
show_in_recent: false
order_in_series: 7
---

Today we'll define the minimal layout for our blog.  

We'll use [Tailwind](https://tailwindcss.com/) utility-first CSS framework and [PostCSS](https://postcss.org/) for this.

So lets quickly define the steps we'll take for today's implementation:

1. Install PostCSS and configure it with GatsbyJs
2. Install Tailwind and configure it with PostCSS
3. Add some CSS
4. Define our blog's minimal layout


## Lets get started  
### 1. Install PostCSS and configure it with GatsbyJs
Install PostCSS plugin for GatsbyJs as below
```sh
npm install gatsby-plugin-postcss
```
Now tell GatsbyJs about this plugin by adding its entry in plugin array in `gatsby-config.js` file  
```js
plugins: [
    ...
    `gatsby-plugin-postcss`
    ...],
```

### 2. Install Tailwind and configure it with PostCSS

Install Tailwind using below command
```sh
npm install tailwindcss
```
Lets inform PostCSS about Tailwind by creating a new file `postcss.config.js` and add below content to it.  
```js
module.exports = () => ({
    plugins: [require("tailwindcss")],
  })
```

Next, configure Tailwind by creating the file `tailwind.config.js` in project root with following content:  

```js
module.exports = {
  corePlugins: {
    preflight: false,
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {},
  variants: {},
  plugins: [],
};
```

> Notice, I am disabling Tailwind's core plugin `preflight`  
> Read more about it [here](https://tailwindcss.com/docs/preflight/#disabling-preflight)

### 3. Add some CSS
Create a new file and import your Tailwind directives

*file: src/css/index.css*
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Apply these additional styles to the browser

*file: gatsby-browser.js*
```js
import "./src/css/index.css"
```

Finally! lets use PurgeCSS directly from Tailwind config to remove unused CSS classed. Create a new file `tailwind.config.js` and add below content to it.  

*file: tailwind.config.js*
```js
module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {},
  variants: {},
  plugins: [],
}
```


### 4. Define our blog's minimal layout

Time to define the blog's minimal layout.  
Lets add a new react component `Layout.js` under `src/components` with following contents:
```js
import React from "react";
import PropTypes from "prop-types";

function Layout({ children }) {
    return (
      <div className="flex flex-col min-h-screen font-sans text-gray-900">
  
        <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 bg-gray-100">
          {children}
        </main>
      </div>
    );
  }
  
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default Layout;
```

Next, utilise the above created layout in `index.js` as below:  

> I have added extra html for greetings!

```js
return (
    <>
        <Layout>
        <h1>Hi! I am RD 👋</h1>

        <p>I am building this blog using GatsbyJs fueled by Markdown files.</p>
        <p>
            If you wish to follow along the journey of building this blog step by step.
        </p>
        <p>
        I am documenting every step here 👉 <Link to="/building-a-markdown-blog">Building a Markdown Blog</Link>
        </p>

        <hr/>
        <h2>
        Recent Posts!
        </h2>
        {data.allMarkdownRemark.edges.map((post) => {
            const {
            title,
            description,
            slug,
            author,
            date_modified,
            } = post.node.frontmatter;
            const excerpt = post.node.excerpt;
            return (
            <>
                <p>{date_modified}</p>
                <Link to={slug}>{title}</Link>
                <p>{description}</p>
                <br />
            </>
            );
        })}
        </Layout>
    </>
);    
```

Also use that layout component in `blogPostTemplate.js` as below:

```js
return (
    <Layout>
        <p>{frontmatter.date_modified}</p>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
);
```

---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/commit/4bb7dc0486c5387e3b78b7158526d01a58944d83) represents what we've done in this post 🤩