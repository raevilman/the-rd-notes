---
title: '1. the setup'
description: 'setting up development environment from scratch.'
slug: '/building-a-markdown-blog/setup'
date_created: '2020-07-17'
date_modified: '2020-07-17'
author: 'RD'
is_published: true
show_in_recent: false
---

## prerequisite
- install git
- install nodeJs

## ready! 🚀

### lets initialize our blog as below

```sh
mkdir the-rd-notes
cd the-rd-notes
```
> Change the folder name as per your liking

### add git and npm

```sh
git init
npm init -y
```

### ignore extras
create `.gitignore` file  
```sh
# creates the file 
touch .gitignore
```
and add below content to it
```sh
# Project dependencies
.cache
node_modules

# Build directory
public

# Other
.DS_Store
yarn-error.log
```

### lets get gatsby
Install the node plugins as follows
```sh
npm install gatsby react react-dom
```

### create pages directory
Add pages folder and index.js file to it  
```sh
mkdir -p src/pages
touch src/pages/index.js
```
Add following to index.js  
```js
import React from 'react';

export default () => {
  return <h1>My awesome blog!</h1>;
};
```

### package.json
Add gatsby `dev` script to the package.json file.  
Your package.json should look like below.
```
{
  "name": "the-rd-notes",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "gatsby develop -p 8888 -o"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/raevilman/the-rd-notes.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/raevilman/the-rd-notes/issues"
  },
  "homepage": "https://github.com/raevilman/the-rd-notes#readme",
  "dependencies": {
    "gatsby": "^2.19.12",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  }
}
```

### launch 🚀
Run below command from project directory in the terminal and your website should run in the default browser at `localhost:8888` 

```
npm run dev
```

### that's all folks!  

In the next part, we will add some markdown content to our blog!

---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/commit/5f33b4a95078a7bd55be6d70e23028f0d9cba28f) represents what we've done in this post 🤩