---
title: '10. Enable Gatsby incremental builds in Netlify'
description: 'Enabling new feature i.e. Gatsby incremental builds in Netlify to reduce the build time'
slug: '/building-a-markdown-blog/enable-gatsby-incremental-builds-in-netlify'
date_created: '2020-09-04'
date_modified: '2020-09-04'
author: 'RD'
is_published: true
show_in_recent: false
is_project: false
order_in_series: 10
---
## Configuration

This note is about enabling the incremental builds feature released by Gatsby team couple of months back in Netlify.  

I followed this [article](https://www.netlify.com/blog/2020/04/23/enable-gatsby-incremental-builds-on-netlify/) and below are the steps I did:  

### 1. Enable the plugin

Created a new file `netlify.toml` in root and added following content to it.  
```
[[plugins]]
  package = "netlify-plugin-gatsby-cache"
```
 This enables the said plugin in the build process in Netlify.

### 2. Add flag

Added the following flag to the build command in package.json
 ```
"build": "GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true gatsby build --log-pages"
 ```
---
## Issues
### > Issue 1
It didn't work, So i updated the build command on [Netlify website](https://app.netlify.com/sites/nifty-ride-238d45/settings/deploys#build-settings)  

![netlify gatsby build command](./netlify-build-command.png)

### > Issue 2
then I found below in the logs

![netlify gatsby no cache](./netlify-gatsby-no-cache.png)

Its a known issue that the plugin doesn't work for preview deploys, at the time of writing this note.  
(GitHub Issue: https://github.com/jlengstorf/netlify-plugin-gatsby-cache/issues/22)


But on production deploys, the plugin seems to find the cache perfectly fine.

![netlify gatsby cache found](./netlify-gatsby-cache-found.png)


We'll see how today's configuration unfolds with future builds.

Till next time! ✌️

---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/pull/5/commits/4f86bddada59ca49ab205e1b82f6ebb60035c2d5) represents what we've done in this post 🤩
