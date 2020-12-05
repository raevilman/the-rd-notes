---
title: '2. markdown'
description: 'adding the first markdown content to blog'
slug: '/building-a-markdown-blog/markdown'
date_created: '2020-07-17'
date_modified: '2020-07-17'
author: 'RD'
is_published: true
show_in_recent: false
---

Let's add some markdown content to our blog.  

Create a folder in the project's root.  

```bash
mkdir notes
```
> I've named it `notes` because my blog's name is theRDnotes.  
> But you can name it `posts` or something else.  

### directory structure

You can choose to store all markdown files under `notes` folder.  
And the images can also be stored alongside.  

But that's a bit of mess in the future, when your blog will host like 1000s of articles.  

In my case, the website will be hosting notes on different technical topics.  
So having nested folders felt a good option to start with.  

Example:  
Notes on `logging in lambda`  will go under `aws/lambda/logging-in-lambda.md`  
and the `lambda` folder will host the image assets for that post as well other posts participating under `lambda` folder.

### frontmatter

Frontmatter is the additional data that is relevant to your post.  
You can specify this data as key-value pairs at the beginning of the file separated by three dashes at the start and end of the block.

Example:
```yaml
---
title: 'Markdown'
description: 'Adding the first markdown content to blog'
slug: '/building-a-markdown-blog/markdown'
date_created: '2020-07-17'
date_modified: '2020-07-17'
author: 'RD'
published: true
show_in_recent: true
---
```

> In GatsbyJs, we'll use `GraphQL` to fetch this frontmatter data in our react components

### add content

Let's add the following two example markdown files under the notes folder.  

- notes/first-post.md

```yaml
---
title: 'My first blog post'
description: 'Adding the first markdown content to blog'
slug: '/first-post'
date_created: '2020-07-17'
date_modified: '2020-07-17'
author: 'RD'
published: true
show_in_recent: true
---

# Hello World 👋

*Welcome to my brand new blog*

- It's my first post here.

- This year I want to make writing a habit thus this blog.
```

- notes/second-post.md

```yaml
---
title: 'My second blog post'
description: 'Adding the second markdown content to blog'
slug: '/second-post'
date_created: '2020-07-17'
date_modified: '2020-07-17'
author: 'RD'
published: true
show_in_recent: true
---

# Welcome Again! 👋

- I am trying to continue on my resolution so far...  
- Lets hope for the best 🤞  
```

### till next time!  

As of now, GatsbyJs doesn't have any idea about the markdown files we added above.  

In the next part, we will configure GatsbyJs to find and process these files into static HTML content.  

---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/commit/c78c51c213d53b2cd97b87ff2bc9c3e9b87b7a4b) represents what we've done in this post 🤩