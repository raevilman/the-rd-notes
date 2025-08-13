
<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const { slug } = route.params

// Construct the full path for content query
// The slug array includes 'notes' as first element, so we need to exclude it
const fullPath = Array.isArray(slug) ? `/notes/${slug.slice(1).join('/')}` : `/notes/${slug}`

// Debug logging
console.log('Route params:', route.params)
console.log('Slug:', slug)
console.log('Full path:', fullPath)


const { data: page } = await useAsyncData(`content-${fullPath}`, async () => {
  try {
    // Use queryCollection for Nuxt Content v3
    // The collection is named 'content' in content.config.ts
    const result = await queryCollection('content').path(fullPath).first()
    return result
  } catch (error) {
    console.error('Query error:', error)
    return null
  }
})

// Extract tags from the current page
const pageTags = computed(() => {
  if (!page.value?.tags) return []
  const tags = page.value.tags
  return Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [])
})

// Get related articles based on the first tag
const { data: relatedArticles } = await useAsyncData(`related-${fullPath}`, async () => {
  if (!pageTags.value.length) return []
  const firstTag = pageTags.value[0]
  return await queryCollection('content')
    .where('is_published', '=', true)
    .where('is_project', '!=', true)
    .where('path', '!=', fullPath)
    .where('tags', 'LIKE', `%${firstTag}%`)
    .select('title', 'description', 'path', 'is_project', 'tags', 'date_created')
    .order('date_created', 'DESC')
    .limit(5)
    .all()
})

useSeoMeta({
  title: () => page.value?.title || 'Article',
  description: () => page.value?.description || 'Concise notes and small projects around cloud, JavaScript, Java, and tooling.',
})
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-10">
    <article v-if="page?.body">
      <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{{ page.title }}</h1>
      
      <!-- Tags display below header -->
      <div v-if="pageTags.length" class="mb-6">
        <div class="flex flex-wrap gap-2">
          <UBadge 
            v-for="tag in pageTags" 
            :key="tag" 
            color="gray" 
            variant="soft"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>
      
      <div class="prose prose-gray dark:prose-invert max-w-none">
        <ContentRenderer :value="page" />
      </div>
      
      <!-- Related articles section -->
      <div v-if="relatedArticles.length" class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Related Articles</h2>
        <ArticleList :items="relatedArticles" />
      </div>
    </article>
    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">Article not found</h1>
      <p class="text-gray-500 dark:text-gray-500">The content you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="text-primary hover:underline mt-4 inline-block">← Back to home</NuxtLink>
    </div>
  </main>
</template>

<style scoped>
/* Moved to assets/css/app.css for global prose styling */
</style>

