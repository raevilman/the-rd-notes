<script setup lang="ts">
import { ref, computed } from 'vue'

const tabIndex = ref(0)
const selectedTags = ref<string[]>([])

const { data: allItems } = await useAsyncData('all-items', () => {
  return queryCollection('content')
    .where('is_published', '=', true)
    .where('show_in_recent', '=', true)
    .order('date_created', 'DESC')
    .select('title', 'description', 'path', 'is_project', 'tags', 'date_created')
    .all()
})

const allTags = computed(() => {
  const set = new Set<string>()
  for (const i of allItems.value || []) {
    const tags = Array.isArray(i.tags) ? i.tags : (typeof i.tags === 'string' ? i.tags.split(',').map(t => t.trim()) : [])
    tags.forEach(t => t && set.add(t))
  }
  return Array.from(set).sort()
})

const filteredItems = computed(() => {
  const tabValue = Number(tabIndex.value)
  
  let items = (allItems.value || [])
  
  if (tabValue === 1) {
    // Projects tab - no tag filtering
    items = items.filter(i => i.is_project === true)
  } else if (tabValue === 2) {
    // Tags tab - show articles with tag filtering
    items = items.filter(i => i.is_project !== true)
    
    // Apply tag filtering only for Tags tab
    if (selectedTags.value.length > 0) {
      items = items.filter(i => {
        const tags = Array.isArray(i.tags) ? i.tags : (typeof i.tags === 'string' ? i.tags.split(',').map(t => t.trim()) : [])
        return selectedTags.value.every(tag => tags.includes(tag))
      })
    }
  } else {
    // Articles tab (default) - no tag filtering
    items = items.filter(i => i.is_project !== true)
  }
  
  return items
})

function toggleTag(tag: string) {
  const idx = selectedTags.value.indexOf(tag)
  if (idx >= 0) selectedTags.value.splice(idx, 1)
  else selectedTags.value.push(tag)
}

const tabs = [
  { label: 'Articles' },
  { label: 'Projects' },
  { label: 'Tags' }
]
</script>

<template>
  <section class="py-12">
    <div class="max-w-3xl mx-auto">
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">Hi, I'm RD</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Explore brief notes and insights from my journey building side projects.</p>
      </div>

      <div class="mb-6 flex justify-center">
        <UTabs v-model="tabIndex" :items="tabs" size="md" />
      </div>

      <!-- Tag selection only shows under Tags tab -->
      <div v-if="Number(tabIndex) === 2" class="mb-10">
        <div class="text-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Filter by tags</h3>
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <UBadge 
            v-for="tag in allTags" 
            :key="tag" 
            :color="selectedTags.includes(tag) ? 'primary' : 'gray'" 
            :variant="selectedTags.includes(tag) ? 'solid' : 'soft'"
            @click="toggleTag(tag)" 
            class="cursor-pointer hover:opacity-80 transition-opacity"
          >
            {{ tag }}
          </UBadge>
        </div>
        <div class="text-center mt-4" v-if="selectedTags.length">
          <UButton color="rose" variant="soft" size="xs" @click="selectedTags=[]">Clear all</UButton>
        </div>
      </div>

      <ArticleList :items="filteredItems" />
    </div>
  </section>
</template>

<style scoped>
</style>

