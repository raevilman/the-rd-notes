---
title: '3. site configuration'
description: 'configuring the GatsbyJS site'
slug: '/building-a-markdown-blog/site-configuration'
date_created: '2020-07-17'
date_modified: '2020-07-17'
author: 'RD'
is_published: true
show_in_recent: false
---

GatsbyJs site can be configured using the file `gatsby-config.js`  

Create the file in the project's root folder.

```bash
touch gatsby-config.js
```

## options

Gatsby provides various options to configure the site, but for this post, we'll use the following options.  

- Plugins
- siteMetadata

### plugins

Plugins are Node.js packages that implement Gatsby APIs.  

The config file `gatsby-config.js` accepts an array of plugins. Some plugins may need only to be listed by name, while others may take options (see the docs for individual plugins).

We'll use the following plugins:

- [`gatsby-source-filesystem`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/): Source data into Gatsby application from local filesystem.

- [`gatsby-transformer-remark`](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/): Parses Markdown files using [Remark](http://remark.js.org/).  
Parsed data will be available as `MarkdownRemark` node which can be queried with GraphQL


Install them using below commands:  

```bash
npm install gatsby-source-filesystem gatsby-transformer-remark
```

### siteMetadata

Data that you want to share across the site(e.g.: site title) can be stored in siteMetadata.  

Example:
```js
siteMetadata: {
    title: 'theRDnotes',
    siteUrl: 'https://www.theRDnotes.com',
    description: 'my personal tech notebook... wip...'
  }
```  

## configuration

Keeping the above-written notes in mind.  
Let's configure our site.  

And the file `gatsby-config.js` should have the following content  

```js
const siteMetadata = {
    title: `theRDnotes`,
    description: `my personal tech notebook... wip...`,
};

module.exports = {
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/notes`,
                name: `notes`,
            },
        }
    ],
};
```

## slug

### theory
A Slug is a part of the URL that uniquely identifies a page on your website.   

Example:  
In `www.example.com/hello-world` URL, `hello-world` is the slug

> Tip: Slugs should be easy to read for humans and search engines.

I'll show you two ways we can use slug.  
1. Hard code the slug in the frontmatter of markdown files.
2. Dynamically generating the slug from filesystem based paths

Initially I thought of using the second approach.  
Then realized that if in future I need to re-organize my markdown files. That will re-generate the slug in build process.  
Which will result in broken links incoming into your blog. 🙅‍♂️


Therefore, In our blog, we'll use the first approach i.e. mentioning the slug in the frontmatter itself.  

Notice we've already placed slug in our two sample markdown files created in the [last post](/building-a-markdown-blog/markdown).  
So nothing is needed to be done for now.


### liked second approach? 😕
Don't you worry my friend! Below section explains to implement that 🥳  

So our post content is in the form of markdown files and we need a logic to create slugs dynamically from markdown files.  

Action items:
 - Create slugs from markdown files
 - Store them somewhere to be read later.

Thankfully `gatsby-source-filesystem` plugin has a function to do the same, using which we'll create slugs and store them under `MarkdownRemark` node. Then using GraphQL, we'll read them back.

### practical
First, we need to create `gatsby-node.js` file project's root.

```bash
touch gatsby-node.js
```

Add the following to `gatsby-node.js` file.  

```js
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `notes` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
```

[`onCreateNode`](https://www.gatsbyjs.org/docs/node-apis/#onCreateNode) is a [Gatsby Node API](https://www.gatsbyjs.org/docs/node-apis/). Called when a node is created. Developers can implement this to extend transform the node.  

[`createFilePath`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#createfilepath) is a helper function to create a URL from a file’s path on the file system.  

[`createNodeField`](https://www.gatsbyjs.org/docs/actions/#createNodeField) is a function to extend a node. The new node field is placed under the fields key on the extended node object.  




## config'd

In the next part, we'll test our configuration using a tool called GraphiQL.  

Also, we'll write GraphQL queries required for our blog.  