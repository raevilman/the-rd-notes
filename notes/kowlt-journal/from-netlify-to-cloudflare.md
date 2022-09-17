---
title: 'Convert HSL string to array'
slug: '/convert-hsl-string-to-array'
date_created: '2022-09-17'
date_modified: '2022-09-17'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: javascript, string, hsl, array, regex
---

JavaScript
```js
const toHSLArray = (hslStr) => {
  const hslArr = hslStr.match(/\d+/g)?.map(Number)
  if (hslArr && hslArr.length >= 3) {
    return [hslArr[0], hslArr[1], hslArr[2]]
  }
}
```

TypeScript
```ts
export const toHSLArray = (
  hslStr: string
): [number, number, number] | undefined => {
  const hslArr = hslStr.match(/\d+/g)?.map(Number)
  if (hslArr && hslArr.length >= 3) {
    return [hslArr[0], hslArr[1], hslArr[2]]
  }
}
```

Example
```js
toHSLArray('hsla(241, 77%, 54%, 1)')
> [241, 77, 54]
```

Till next time, take care ✌