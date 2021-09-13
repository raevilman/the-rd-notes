---
title: 'Node API using Vercel Serverless Functions'
description: 'A quick POC showcasing how to build and deploy node API using Vercel Serverless Functions'
slug: '/build-and-deploy-node-api-using-vercel-serverless-functions'
date_created: '2021-09-13'
date_modified: '2021-09-13'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: node, api, vercel, serverless, functions
---

This note is about how to setup, build and deploy an API using Vercel Serverless Functions.

## VLog
If you prefer to watch the video instead of reading article,  
its available at https://youtu.be/TE9MNxEeOI4  
Length: 14:38 mins  


## Setup Vercel 

1. Create an account at Vercel.
2. install Vercel CLI and log in
```sh
yarn global add vercel
vercel login
```

## Setup Project
3. Initiate the project using below commands and add Vercel NPM module as dev dependency.  
```sh
mkdir node-api-using-vercel
cd node-api-using-vercel
yarn init -y
yarn add vercel -D
```

## Create API
Next, lets create an API endpoint `/hello`  
```sh
mkdir api
cd api
touch hello.js
```
Add the following code to `hello.js`  

```sh
module.exports = (req, res) => {
    res.json({
      msg: 'hello there, how are you!!'
    });
  };
```

## Test API
To test the API, start the local dev server using

```sh
vercel dev
```

Your API should be exposed on `localhost:3000/api/hello` and hitting this endpoint will return below response
```json
{
    "msg": "hello there, how are you!!"
}
```

## Path Segments
You can easily have path segments by naming your file like `[file_name.js]`.  
When a file's name is wrapped in the square brackets, it is treated as a (dynamic) path segment  
and its value is assigned to a variable with a name same as file name, `file_name` in above case.  
This variable is then passed under `req.query` object to the API code.

So if we create a directory `users` under `api` directory and  
then create a file `[user_id].js` file in it with following code

```js
module.exports = (req, res) => {
    const {
        query: { user_id },
      } = req;
    
      res.send({
          msg: `Hello ${user_id}!`
      });
  };
```

Now when we hit the endpoint `localhost:3000/api/users/123`, it will respond back as below  
```json
{
    "msg": "Hello 123!"
}
```

## Vercel Config
You can configure your Vercel Project with various options available at https://vercel.com/docs/cli#project-configuration  

But lets see one option `rewrites`.  

To avoid `api` being part of the endpoint, we can define a rewrite rule.  
For that create `vercel.json` in project root with following content.  

```json
{
    "rewrites": [
        {
            "source": "/users/:user_id",
            "destination": "/api/users/:user_id"
        }
    ]
}
```

Restart the server using `vercel dev` command.

Now you can call the API using `localhost:3000/hello` instead of `localhost:3000/api/hello`


---


Thats it about this note.  
HIH









