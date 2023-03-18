---
title: 'Vue CheatSheet'
slug: '/vue-cheatsheet'
date_created: '2023-03-18'
date_modified: '2023-03-18'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: vue, cheatsheet
---

# Vue CheatSheet

## Arrays
### In props
```js
props: {
    radioItems: {
      type: Array as PropType<Array<RadioItem>>,
      required: true,
    },
  },
```

### As `ref`
```js
const openState = ref([] as Array<number>)
```