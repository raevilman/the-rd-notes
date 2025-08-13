---
title: 'Getting epoch time'
description: 'Getting epoch time in various languages'
slug: '/getting-epoch-time'
date_created: '2020-09-26'
date_modified: '2020-09-26'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
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