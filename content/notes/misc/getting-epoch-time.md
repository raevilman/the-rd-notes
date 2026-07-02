---
title: 'Getting epoch time'
description: 'Getting epoch time in various languages'
slug: '/getting-epoch-time'
date_created: '2020-09-26'
is_published: true
is_project: false
tags: javascript, epoch
---

Javascript
```js
export function getEpoch(): number {
  return Math.floor(new Date().getTime() / 1000.0);
}
```

Postgres
```sql
select (FLOOR(EXTRACT(epoch FROM NOW()))::int)
```