<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div v-for="item in items" :key="item.path" class="py-8">
      <NuxtLink :to="item.slug" class="text-lg font-medium hover:underline text-gray-900 dark:text-white">{{ item.title }}</NuxtLink>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2" v-if="item.description">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ArticleItem {
  title: string
  description?: string
  path: string
  slug: string
  is_project?: boolean
  tags?: string[] | string
  date_created?: string
}

defineProps<{
  items: ArticleItem[]
}>()
</script>
