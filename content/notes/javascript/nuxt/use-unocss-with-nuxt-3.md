---
title: 'Use UnoCSS with Nuxt 3'
slug: '/use-unocss-with-nuxt-3'
date_created: '2023-04-01'
date_modified: '2023-04-01'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: nuxt, unocss
---

# Use UnoCSS with Nuxt 3

## Install

UnoCSS
```zsh
pnpm add -D @unocss/nuxt
```

Icons preset
```
pnpm add -D @unocss/preset-icons @iconify-json/mdi @iconify-json/mdi-light
```

## Configure

`nuxt.config.js`

```js
export default {
  modules: [
    '@unocss/nuxt',
  ],
  unocss: {
    // presets
    attributify: true, // enabled `@unocss/preset-attributify`,
    uno: true, // enabled `@unocss/preset-uno`
    icons: {
      extraProperties: {
        display: "inline-block",
      },
      customizations: {
        iconCustomizer(collection, icon, props) {
          // default size
          props.width = "1.5em";
          props.height = "1.5em";
          // customize this @iconify icon in this collection
          // if (collection === "mdi") {
          //   props.width = "1.5em";
          //   props.height = "1.5em";
          // }
        },
      },
    }, // enabled `@unocss/preset-icons`
    // core options
    shortcuts: [],
    rules: [],
  },
}
```

## VSCode IntelliSense

Install the [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) extension.

If facing issues, try adding below in `nuxt.config.js`:

```js
// below is added to enable UnoCSS VS Code extension
import { defineNuxtConfig } from "nuxt/config";
```

and disable -> enable the extension.

