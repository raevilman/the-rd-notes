---
title: 'Sorting in REST API'
description: 'Implementing a query parameter for sorting in REST API'
slug: '/sorting-in-rest-api'
date_created: '2020-09-09'
date_modified: '2020-09-09'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: rest, api
---
Notes on implementing sorting in REST API.  

## Query parameter: sort
With relation database at back, I would be using `order by` SQL clause while querying the db and it goes like `order by col_name desc`.  

Therefore, I need to implement a way for API clients to pass this info, which is:  
- column name
- order direction

So we can ask this info as:  

- two separate query parameters  
OR
- one query parameter with column name and order direction combined using a separator
  
For now I'll go ahead with second option as I am thinking of supporting sorting by multiple columns as well thus second option seems straight forward simple to me.  


Below will be the format:  

```
GET /stocks?sort=price:desc
```

for multi-column sort:  

```
GET /stocks?sort=price:desc&sort=name:asc
```

## Validation

For security against SQL injections, I am going to implement a simple whitelist approach. Wherein the column name and sort direction will be checked against a predefined column name list and asc/desc values. Not so fancy but works.  

