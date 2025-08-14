<script setup lang="ts">

const route = useRoute()
const router = useRouter()

const tabs = [
  { label: 'Articles', value: 'articles' },
  { label: 'Projects', value: 'projects' },
  { label: 'Tags', value: 'tags' }
]

const tabValue = ref((route.query.tab as string) || 'articles')
const selectedTags = ref<string[]>([])

watch(tabValue, (val) => {
  router.replace({ query: { ...route.query, tab: val } })
})




const { data: allItems } = await useAsyncData('all-items', () => {
  return queryCollection('content')
    .where('is_published', '=', true)
    .where('show_in_recent', '=', true)
    .order('date_created', 'DESC')
    .select('title', 'description', 'path', 'slug', 'is_project', 'tags', 'date_created')
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
  let items = (allItems.value || [])
  if (tabValue.value === 'projects') {
    items = items.filter(i => i.is_project === true)
  } else if (tabValue.value === 'tags') {
    items = items.filter(i => i.is_project !== true)
    if (selectedTags.value.length > 0) {
      items = items.filter(i => {
        const tags = Array.isArray(i.tags) ? i.tags : (typeof i.tags === 'string' ? i.tags.split(',').map(t => t.trim()) : [])
        return selectedTags.value.every(tag => tags.includes(tag))
      })
    }
  } else {
    items = items.filter(i => i.is_project !== true)
  }
  return items.map(i => ({
    title: i.title ?? '',
    description: i.description,
    path: i.path,
    slug: i.slug ?? i.path ?? '',
    is_project: i.is_project,
    tags: i.tags,
    date_created: i.date_created
  }))
})

function toggleTag(tag: string) {
  const idx = selectedTags.value.indexOf(tag)
  if (idx >= 0) selectedTags.value.splice(idx, 1)
  else selectedTags.value.push(tag)
}

</script>

<template>
  <section class="py-12">
    <div class="max-w-3xl mx-auto">
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">Hi, I'm RD</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Explore brief notes and insights from my journey building side projects.</p>
      </div>

      <div class="mb-6 flex justify-center">
        <UTabs v-model="tabValue" :items="tabs" size="md" />
      </div>

      <!-- Tag selection only shows under Tags tab -->
  <div v-if="tabValue === 'tags'" class="mb-10">
        <div class="text-center mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Filter by tags</h3>
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <UBadge 
            v-for="tag in allTags" 
            :key="tag" 
            :color="selectedTags.includes(tag) ? 'primary' : 'neutral'" 
            :variant="selectedTags.includes(tag) ? 'solid' : 'soft'"
            @click="toggleTag(tag)" 
            class="cursor-pointer hover:opacity-80 transition-opacity"
          >
            {{ tag }}
          </UBadge>
        </div>
        <div class="text-center mt-4" v-if="selectedTags.length">
          <UButton color="error" variant="soft" size="xs" @click="selectedTags=[]">Clear all</UButton>
        </div>
      </div>

      <ArticleList :items="filteredItems" />
    </div>
  </section>
</template>

<style scoped>
</style>

