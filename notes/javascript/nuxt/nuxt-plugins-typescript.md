---
title: "Nuxt Plugins Typescript"
description: "Nuxt Plugins in Typescript"
slug: "/nuxt-plugins-typescript"
date_created: "2022-11-19"
date_modified: "2022-11-19"
author: "RD"
is_published: true
show_in_recent: true
is_project: false
tags: nuxt, typescript, plugins
---

## Create a plugin

Create a file in `plugins` folder with `.ts` extension.  
For example, `puppy.ts`

```ts
class Puppy {
  private static _self: Puppy

  // eslint-disable-next-line no-useless-constructor
  private constructor() {}

  public static getInstance() {
    return this._self || (this._self = new this())
  }

  bark() {
    console.log('Puppy::bark')
  }
}
```
## Register the plugin

Add the plugin to `nuxt.config.ts` file.

```ts
plugins: ['~/plugins/puppy.ts'],
```

## Injecting plugin

Let's inject our plugin into Nuxt Context  
by addign a new property to the context under `@nuxt/types`.

Add folloging code to `plugins/puppy.ts` file.

```ts
import Vue from 'vue'
import { Plugin } from '@nuxt/types'

class Puppy {
  ...
}

declare module '@nuxt/types' {
  interface Context {
    $puppy: Puppy
  }
}

const puppyPlugin: Plugin = (context) => {
  context.$puppy = Puppy.getInstance()
}

export default puppyPlugin
```

### Usage

```vue
<template>
    ...
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    
    const { $puppy } = useContext()
    $puppy.bark()
    
    return {}
  },
})
</script>
```


References:
- https://typescript.nuxtjs.org/cookbook/plugins/