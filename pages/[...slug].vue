


// No import for queryContent; use useFetch instead
import { useRoute } from 'vue-router'
import { useAsyncData, useSeoMeta } from '#app'


<script setup lang="ts">
import { computed } from 'vue'


const route = useRoute()

// Remove trailing slash from slug
let { slug } = route.params
if (typeof slug === 'string') {
  slug = slug.replace(/\/+$/, '')
} else if (Array.isArray(slug)) {
  slug = slug.map(s => s.replace(/\/+$/, ''))[0]
}

// Hardcoded: Render the article with slug 'git-init-default-branch-name' using Nuxt Content v3 queryCollection

const { data: page } = await useAsyncData(`content-${slug}`, async () => {
  try {
    const result = await queryCollection('content')
      .where('slug', 'LIKE', `%${slug}%`)
      .first()
    return result
  } catch (error) {
    console.error('Query error:', error)
    return null
  }
})

const fullPath = computed(() => page.value?.path || '')

// Extract tags from the current page
const pageTags = computed(() => {
  if (!page.value?.tags) return []
  const tags = page.value.tags
  return Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [])
})

// Get related articles based on the first tag, excluding current by slug


// Get related articles based on the first tag

const { data: relatedArticles } = await useAsyncData(
  () => `related-${fullPath.value}`,
  async () => {
    if (!pageTags.value.length || !fullPath.value) return []
    const firstTag = pageTags.value[0]
    const results = await queryCollection('content')
      .where('is_published', '=', true)
      .where('tags', 'LIKE', `%${firstTag}%`)
      .select('title', 'description', 'path', 'is_project', 'tags', 'date_created')
      .order('date_created', 'DESC')
      .limit(10)
      .all()
    // Filter out current article and projects in JS
    return results
      .filter(a => a.path !== fullPath.value && !a.is_project)
      .slice(0, 5)
      .map(a => ({
        slug: a.path?.split('/').pop() || '',
        path: a.path,
        title: a.title || '',
        description: a.description || '',
        date_created: a.date_created || '',
        is_project: a.is_project || false,
        tags: Array.isArray(a.tags) ? a.tags : (typeof a.tags === 'string' ? a.tags.split(',').map(t => t.trim()) : [])
      }))
  }
)

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
            color="neutral" 
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
      <div v-if="relatedArticles?.length" class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Related Articles</h2>
        <ArticleList :items="relatedArticles ?? []" />
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

