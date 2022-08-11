---
title: 'From Netlify to Cloudflare'
description: 'Moving my project from Netlify to Cloudflare'
slug: '/from-netlify-to-cloudflare'
date_created: '2022-08-11'
date_modified: '2022-08-11'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: jamstack, hosting, netlify, cloudflare
---

## Why to move?
Netlify recently stopped supporting org-owned private repository of GitHub in their free plan.  

Eh! Not a big deal, I could manually deploy and thats what I tried.  But the caching problem has always bugged me at Netlify.  

After failing to get the fresh code deployed using Netlify CLI, I tried pushing to the new alias(sub-domain) and this time I could see the code changes. Which proves some caching issue with the previous trial.  

Now I'm with one *new* sub-domain with *new* code and one *old* sub-domain with *old* cached build AND guess what you can't delete the deployed previews yourself in 2022 and might need to reach out to support to do that 🤦‍♀️  

<details>
<summary>btw! I was using a hack for Netlify cache issue earlier</summary>

```
let url ="https://api.netlify.com/api/v1/deploys/" + deployId + "/retry";
let options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
    body: '{"clear_cache":true}',
};
```
</details>

---

So what next? Time to look for other static site hosting providers.  

Shortlisted: Cloudflare. Let's give it a try!  


ERROR!


```
The engine "node" is incompatible with this module. Expected version ">=14.x". Got "12.18.0"
```

Had to setup one environment variable in build settings like below and we are good to go again.
```
NODE_VERSION=16.11.0
```

👌 All worked. Also tried pushing a small change to test if issue with caching! Nope all good as of now.  

I'll continue using this for next couple of weeks before moving the domain itself to the Cloudflare.  

Till next time, take care ✌