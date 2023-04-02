---
title: 'Use SCSS with Nuxt 3'
slug: '/use-scss-with-nuxt-3'
date_created: '2023-03-26'
date_modified: '2023-03-26'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: nuxt, scss
---

# Use SCSS with Nuxt 3

## Install sass

```zsh
pnpm add -D sass 
```

> Now you can use `<style lang="scss">` in your components.

## mixins & variables

Create a file `@/assets/scss/_vars.scss`.  
This will contain mixins and variables as below:  

```scss
// variables

$dandy: #7ad9ff;

// mixins

@mixin k-border {
  border: 1px solid lightgray;
  border-radius: 4px;
}

@mixin k-border-debug {
  border: 1px dotted red;
  border-radius: 4px;
}
```

## Global CSS

Next create a file `@/assets/scss/global.scss`.
  
```scss
.k-border {
  @include k-border;
}

.k-border-debug {
  @include k-border-debug;

  background-color: $dandy;
}
```

## Add global.scss to nuxt.config.js

```js
export default defineNuxtConfig({
  css: ["@/assets/scss/global.scss"],
});
```

## Global mixins & variables

To use mixins and variables in all components, add below vite config to `nuxt.config.js`.

```js
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_vars.scss" as *;',
        },
      },
    },
  },
});
```

Now you can use mixins and variables in all components.

```scss
<style lang="scss" scoped>
.k-content {
  @include k-border-debug;
}
</style>
```


