---
title: 'How to Use Lucide Icons with Vuetify'
description: 'A guide on integrating Lucide icons into a Vuetify project.'
slug: '/how-to-use-lucide-icons-with-vuetify'
date_created: '2025-08-14'
date_modified: '2025-08-14'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: vuetify, javascript
---

# How to Use Lucide Icons with Vuetify in Your Vue 3 Project

Lucide is a beautiful, open-source icon library. Integrating Lucide icons with Vuetify in a Vue 3 project is simple and gives you access to a modern, consistent icon set.

## 1. Install Lucide Vue

```sh
pnpm add lucide-vue-next
```

## 2. Register Lucide as a Custom Icon Set in Vuetify

In your Vuetify plugin (e.g., `src/plugins/vuetify.ts`):

```ts
import { h } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const lucideIconSet = {
  component: (props) => {
    const iconName = typeof props.icon === 'string'
      ? props.icon.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
      : props.icon
    const LucideIcon = (LucideIcons as any)[iconName]
    return typeof LucideIcon === 'function' ? h(LucideIcon, { ...props }) : null
  }
}

const vuetify = createVuetify({
  icons: {
    defaultSet: 'lucide',
    sets: { lucide: lucideIconSet }
  }
})
```

## 3. Use Lucide Icons in Your Components

```vue
<v-icon icon="plus" />
<v-icon icon="arrow-left" />
```

Use the Lucide icon name in kebab-case (e.g., `arrow-left`, `edit`, `trash-2`).

---

**Tip:** You can use any Lucide icon by referencing its name. For the full list, see the [Lucide documentation](https://lucide.dev/icons/).
