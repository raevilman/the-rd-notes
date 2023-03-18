---
title: 'Best Practices for REST API Design'
slug: '/rest-api-design-best-practices'
date_created: '2022-09-23'
date_modified: '2022-12-20'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: rest, api, best-practices, design
---
<small>*a live document*</small>  

Expand below sections to read more about them  
<details open><summary>

## API Design
</summary>

### Endpoints

- Combination of noun & verb.

    | Description | Verb | Noun | API |
    | :-- | :--- | :--- | :--- |
    | Get all accounts | Get | Accounts | GET www.example.com/accounts |
    | Delete a message with ID 1 | Delete | Meesage | DELETE www.example.com/message/1 |

    Don't use verbs as part of the URLs.  
    Eg: 
    www.example.com/get-accounts  

    HTTP verbs are there for this purpose only.

- Use hyphens to separate words  
    Eg: 
    www.therdnotes.com/rest-api-design-best-practices  

### Query parameters  

- Use underscore to separate words  
    Eg:  
    www.therdnotes.com/posts?sort_by=id  

### Status codes

Return proper status codes. Spend like 30 minutes to read all the status codes and their use case.  

### Pagination

Let clients pass limit & page for all GET APIs.  
Fallback to default values if they don't pass.

Eg: www.example.com/exployees?limit=100&page=2

### Sorting

Read [this](/sorting-in-rest-api). Also has info on multi-column sorting.  

</details>

<details><summary>

## API Security
</summary>

### Rate limiting

Avoid [DOS (Denial-of-Services)](https://en.wikipedia.org/wiki/Denial-of-service_attack) attacks.  

Client exceeding limits should be sent following response status:  

```
429 Too Many Requests
```

</details>

<details><summary>

## API management</summary>

### Versioning

Versioning keeps both API developers and consumers happy and loosely coupled.  

Below is path based versioning  
```
www.example.com/v1/employees // Version 1

www.example.com/v2/employees // Version 2

www.example.com/v3/employees // Version 3
```

### Documentation

At least, automatically generate swagger documentation using libraries and serve them using Swagger-UI.
</details>

--- 

Sources:
- https://stackoverflow.com/a/18450653/958616