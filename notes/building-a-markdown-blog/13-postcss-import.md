---
title: '13. PostCSS Import'
description: 'A little cleanup using postcss-import plugin'
slug: '/building-a-markdown-blog/postcss-import'
date_created: '2020-09-05'
date_modified: '2020-09-05'
author: 'RD'
is_published: true
show_in_recent: false
is_project: false
order_in_series: 13
---

If you see `src/css/index.css`, I have defined a lot of custom css to un-reset the tailwind preflight.  

And its a mess. I want this custom css to be moved into its own separate file and make this one a bit cleaner.  

> This is being done for the next step we are going to implement in our blog i.e. <i><b>Theming with tailwind</b></i>

### Cleanup
To clean it up, I've moved the custom css to a new file `src/css/unreset.css`.  
So now content of `src/css/index.css` looks like below:  
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

### Install
Next I tried importing the new css back in `src/css/index.css` as below, but it didn't work:
```js
@import 'unreset.css';
```

To make `@import` work, I had to install `postcss-import`  
```sh
npm install postcss-import
```
> this is PostCSS plugin to transform @import rules by inlining content.  

### Configure
Lets configure this plugin to run before tailwind in `postcss.config.js` so that tailwind can find all the content inline.
```js
module.exports = () => ({
  plugins: [
    require("postcss-import"), 
    require("tailwindcss")
  ],
});
```
### Use @import for all
Now change `src/css/index.css` file  

from  
```js
@tailwind base;
@import 'unreset.css';
@tailwind components;
@tailwind utilities;
```

to  
```js
@import "tailwindcss/base";
@import 'unreset.css';
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

Now the css looks a much cleaner.

Thats it for this note.

---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/commit/132fd228e8b2ab44790af78e57ec0c05791b5760) represents what we've done in this post 🤩
