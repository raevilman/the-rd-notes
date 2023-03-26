---
title: 'Vue Declaration CheatSheet'
slug: '/vue-declaration-cheatsheet'
date_created: '2023-03-18'
date_modified: '2023-03-18'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: vue, cheatsheet
---

# Vue CheatSheet

## 1. Props
### Arrays
```js
props: {
    radioItems: {
      type: Array as PropType<Array<RadioItem>>,
      required: true,
    },
  },
```

## 2. refs
### Arrays
```js
const openState = ref([] as Array<number>)
```