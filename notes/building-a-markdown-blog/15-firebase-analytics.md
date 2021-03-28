---
title: "15. Firebase Analytics"
description: "Adding Firebase Analytics to our blog"
slug: "/building-a-markdown-blog/firebase-analytics"
date_created: "2020-10-22"
date_modified: "2020-10-22"
author: "RD"
is_published: true
show_in_recent: false
is_project: false
order_in_series: 15
---

Today, we'll add Firebase Analytics to our blog.  
For this we'll use [firebase](https://www.npmjs.com/package/firebase) and [gatsby-plugin-firebase](https://www.gatsbyjs.org/packages/gatsby-plugin-firebase/).

## Install

Install the plugin using below command  

```
npm install firebase gatsby-plugin-firebase
```

## Configure
- Add the following configuration under plugins list in `gatsby-config.js` file.  

```js
{
    resolve: "gatsby-plugin-firebase",
    options: { 
    credentials: {
        apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
        // authDomain: "<auth-domain>",
        // databaseURL: "<db-url>",
        projectId: process.env.REACT_APP_FIREBASE_WEB_PROJECT_ID,
        // storageBucket: "<storage-bucket>",
        // messagingSenderId: "<msg-sender-id>",
        appId: process.env.REACT_APP_FIREBASE_WEB_APP_ID,
        // measurementId: "<-measurement-id>"
      }
    }
},
```
> Because i'll be using firebase only for analytics purpose for now, therefore i've commented out irrelevant options.  


If you notice above, we are reading the firebase config values from the environment.  
As per [Gatsby docs](https://www.gatsbyjs.com/docs/environment-variables/), variables defined in the `.env.*` files won't be available in Node.js scripts. So i added below to `gatsby-config.js` to access them while configuring firebase plugin.  

```js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
```

- Add the following import to `gatsby-browser.js` in project root

```js
import "firebase/analytics" 
```

## Tracking Events

For tracking, I've added below to the `Layout.js`    

```js
import firebase from "gatsby-plugin-firebase"

useEffect(() => {
    firebase
      .analytics()
      .setCurrentScreen(window.location.pathname)
    firebase
      .analytics()
      .logEvent(title)
  }, []);
```

---
Following are the GitHub commits which represents what we've done in this post 🤩  
- [commit 1](https://github.com/raevilman/the-rd-notes/commit/cb597250df5236e9cb2ce4733a8fcc9adcef7d50) - Adds firebase analytics  