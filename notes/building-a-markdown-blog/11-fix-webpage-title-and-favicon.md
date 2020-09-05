---
title: '11. Fix webpage title and favicon'
description: 'Fixing webpage title and setting a favicon'
slug: '/building-a-markdown-blog/fix-webpage-title-and-favicon'
date_created: '2020-09-5'
date_modified: '2020-09-05'
author: 'RD'
is_published: true
show_in_recent: false
is_project: false
---
In this note we'll do the following:  
- fix the web page title to render the name of current note
- add a favicon to our Gatsby website

## > title
For rendering the correct web page title according to the current page, we'll use `gatsby-plugin-react-helmet` and `react-helmet`

### Install
lets install them as below:  
```sh
npm install gatsby-plugin-react-helmet react-helmet
```

### Configure
Then add the `gatsby-plugin-react-helmet` to the plugins list in `gatsby-config.js`
```js
{
  plugins: [`gatsby-plugin-react-helmet`]
}
```
### Use helmet
Next, go ahead and use the react helmet in your pages  

My current requirements were dead simple, just to show title. So i didn't bother to worry much at this point setting up fancy hooks for siteMetadata just to get site title etc. May be in future.

But for now, I just added following to the `Layout` component  
```js
import { Helmet } from "react-helmet"

function Layout({ children, title }) {
    return (
      <>
        <Helmet title={title} />
        ...
        ...
      </>
    );
  }
``` 
and then passed the `title` wherever I'm using the `Layout` component.  

Eg: below is the case for `src/templates/blogPostTemplate.js`

```js
<Layout title={frontmatter.title}>
```

and in `index.js` I'm simply passing the hardcoded value:  
```js
<Layout title="theRDnotes">
```
---
## > favicon
For this, I've installed a plugin `gatsby-plugin-manifest` as
```sh
npm install gatsby-plugin-manifest
```

and did the configuration in `gatsby-config.js` like below

```js
plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `theRDnotes`,
        short_name: `theRDnotes`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/favicon.png`
      },
    },
  ]
```

> You can find info about the options used in configuration at https://web.dev/add-manifest/

### Bonus

To save time, I created favicon using an online tool `favicon.io`. Below is the URL with configs, I've used, to generate the icon.  

https://favicon.io/favicon-generator/?t=R&ff=Playfair+Display&fs=130&fc=%23FFF&b=circle&bc=%23025


---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/commit/9d8fa277619bc08291a55933783b34652eccfc98) represents what we've done in this post 🤩
