---
title: '8. Restructure index page'
description: 'Restructuring the listing on index page'
slug: '/building-a-markdown-blog/restructure-index-page'
date_created: '2020-07-22'
date_modified: '2020-07-22'
author: 'RD'
is_published: true
show_in_recent: false
is_project: false
---
## Today's thoughts
### i) Remove the mess 🧹
Today, I decided to restructure the items displayed on the index page.  

The current state is that, every published markdown file was listed under recent notes section.  
>By 'published' I mean that `is_published` is set to `true` in frontmatter of the markdown file.  

But it was a bit messy on the front page.  

So I decided ***not*** to list the notes, which are part of ***a series***, in the recent section of the index page. Just list the entry, for the series.  

For example, we won't list all the notes participating in the series '[Building a markdown blog](/building-a-markdown-blog)'. [But] we will list the series on index page.  

### ii) Projects 🤩

Second, I thought of introducing a new section for listing the projects I have done or doing.  
To implement this, I have introduced a new frontmatter variable `is_project` 🤷‍♂️  

---

## Make changes
Lets implement the above discussed changes. The only file we are going to touch today is `src/pages/index.js`

### Update query
Update the GraphQL query to  
- filter the results with `show_in_recent: { eq: true }`  
- include the new variable `is_project` in our response.  

So the query is now as below:  

```
query SiteIndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date_modified]}
      filter: {
        frontmatter: {
          is_published: { eq: true }
          show_in_recent: { eq: true }
        }
      }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            description
            slug
            date_modified
            author
            is_published
            show_in_recent
            is_project
          }
        }
      }
    }
  }
```

### Update HTML
Next, I have updated the HTML to use introduce the new section for `Projects`.  

For now I have done all these HTML changes in `index.js` file itself. But I definitely would like them to be separate react components. But that's for some other day.  
You can have a look at the HTML code changes in the GitHub commit mentioned below.

---
This [GitHub commit](https://github.com/raevilman/the-rd-notes/commit/0aaac22b562bb937be499c8cda27b862b31337b4) represents what we've done in this post 🤩