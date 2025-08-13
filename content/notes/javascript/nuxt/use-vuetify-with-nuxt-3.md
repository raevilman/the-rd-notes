---
title: 'Use Vuetify with Nuxt 3'
slug: '/use-vuetify-with-nuxt-3'
date_created: '2023-03-26'
date_modified: '2023-03-26'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: nuxt, vuetify, sass
---

# Use Vuetify with Nuxt 3

## Install Vuetify, sass, vite-plugin-vuetify and @mdi/font


```zsh
pnpm add -D vuetify sass vite-plugin-vuetify @mdi/font
```

## Create plugins/vuetify.js

```js
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
  });
  nuxtApp.vueApp.use(vuetify);
});
```

## Add plugins/vuetify.js to nuxt.config.js

```js
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
  css: ["vuetify/styles/main.sass", "@mdi/font/css/materialdesignicons.css"],
  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins?.push(vuetify());
    },
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
```