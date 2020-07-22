---
title: '9. Fix images not rendering'
description: 'Fixing the issue of images not getting rendered from markdown files.'
slug: '/building-a-markdown-blog/fix-images-not-rendering'
date_created: '2020-07-22'
date_modified: '2020-07-22'
author: 'RD'
is_published: true
show_in_recent: false
is_project: false
---
## Theory
In this note, we'll fix the issue of images not getting rendered.  
This will be pretty straight forward, as there is plugin for the same 😉  

We'll use [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/) and [gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/) Gatsby plugin  

[Here](https://www.gatsbyjs.org/docs/working-with-images-in-markdown/) is the article on gatsby.org that I've followed for this post.  

## Practical
### 1. Install
Install the plugin as follows:  
```sh
npm install gatsby-remark-images gatsby-plugin-sharp
```

### 2. Configure
Tell gatsby to use these plugin by updating the `gatsby-config.js` as below

```js
const siteMetadata = {
  title: `theRDnotes`,
  description: `my digital notebook...`,
};

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/notes`,
        name: `notes`,
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
```

> Don't forget to ***restart*** your local/dev server after you have changed `gatsby-config.js` file

### That's It!
Go ahead and add the images to your markdown files using below syntax  
```
![alt text](./first-blog-post.png)
```
---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/commit/414c4c77a6bb5e58156d2cfc250bb7f148cbe73e) represents what we've done in this post 🤩