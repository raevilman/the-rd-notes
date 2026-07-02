<script setup lang="ts">
import FileTreeNav from '~/components/FileTreeNav.vue'

const route = useRoute()
const router = useRouter()

const pathParam = route.params.path as string | string[]
const pathStr = Array.isArray(pathParam) ? pathParam.join('/') : (pathParam || '')
const requestedPath = `notes/${pathStr}`.replace(/\/$/, '')

// Fetch folder list to check if this is a folder or article
const { data: noteFolders } = await useAsyncData('folder-check', () =>
  $fetch<string[]>('/api/notes-folders')
)

// Normalize paths for comparison
const normalizedRequested = requestedPath.toLowerCase().replace(/\/+$/, '')
const isFolder = computed(() => {
  if (!noteFolders.value) return false
  return noteFolders.value.some(f => f.toLowerCase().replace(/\/+$/, '') === normalizedRequested)
})

// If it's not a folder, it might be an article - handle it as such
if (!isFolder.value && pathStr) {
  // Try to find the article by slug
  const slug = `/${pathStr}`
  const { data: article } = await useAsyncData(`article-${slug}`, () =>
    queryCollection('content')
      .where('slug', '=', slug)
      .first()
  )

  // If article found, render it using the default article layout
  if (article.value) {
    // Article exists - let it render with default layout
    // The slot will contain the article content
  } else {
    // Not found
    throw createError({ statusCode: 404, message: 'Page not found' })
  }
}

// Folder view setup
const selectedPath = ref(requestedPath)

const breadcrumbs = computed(() => {
  const parts = (selectedPath.value || 'notes').split('/').filter(Boolean)
  return parts.map((part, index) => ({
    label: part.toLowerCase() === 'notes' ? 'Notes' : part,
    path: parts.slice(0, index + 1).join('/')
  }))
})

const { data: allItems } = await useAsyncData('folder-items', () => {
  return queryCollection('content')
    .where('is_published', '=', true)
    .where('is_project', '!=', true)
    .order('date_created', 'DESC')
    .select('title', 'description', 'path', 'slug', 'is_project', 'tags', 'date_created')
    .all()
})

function onSelectPath(path: string) {
  const target = path.startsWith('/') ? path : `/${path}`
  router.push(target)
}

function onNavigatePath(path: string) {
  selectedPath.value = path
  const segment = path === 'notes' ? '/notes' : `/notes/${path.replace(/^notes\//, '')}`
  router.push(segment)
}

function onBreadcrumbClick(path: string) {
  const segment = path === 'notes' ? '/notes' : `/notes/${path.replace(/^notes\//, '')}`
  router.push(segment)
}

watch(() => requestedPath, (newPath) => {
  selectedPath.value = newPath
})
</script>

<template>
  <!-- Show folder navigator if this is a folder -->
  <section v-if="isFolder" class="py-12">
    <div class="max-w-3xl mx-auto">
      <div class="mt-6">
        <!-- Breadcrumbs aligned to same panel width -->
        <div class="flex justify-center mb-2 px-2">
          <div class="w-full max-w-2xl">
            <div class="breadcrumbs-wrap">
              <button
                v-for="(crumb, idx) in breadcrumbs"
                :key="crumb.path"
                type="button"
                class="crumb"
                @click="onBreadcrumbClick(crumb.path)"
              >
                <span v-if="idx > 0" class="sep">/</span>
                <span>{{ crumb.label }}</span>
              </button>
            </div>
          </div>
        </div>
        <!-- Single-panel file navigator centered -->
        <div class="flex justify-center mb-6 px-2">
          <div class="w-full max-w-2xl">
            <FileTreeNav 
              :items="allItems" 
              :folders="noteFolders || []"
              :currentPath="selectedPath"
              @select="onSelectPath"
              @navigate="onNavigatePath"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Otherwise render as article via slot -->
  <div v-else>
    <slot />
  </div>
</template>

<style scoped>
.breadcrumbs-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: rgb(100, 116, 139);
}

.crumb {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 0;
  background: transparent;
  padding: 0;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
}

.crumb:hover {
  opacity: 0.7;
}

.sep {
  color: rgb(148, 163, 184);
}

:global(.dark) .breadcrumbs-wrap {
  color: rgb(148, 163, 184);
}
</style>
