<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  folders: { type: Array, default: () => [] },
  currentPath: { type: String, default: '' }
})

const emit = defineEmits(['select', 'navigate'])

// Build tree structure from items
function buildTree(items) {
  const root = { name: '', folders: {}, files: [] }
  const seenFileKeys = new Set<string>()

  function normalizeRoute(value: string) {
    if (!value) return ''
    return value.startsWith('/') ? value : `/${value}`
  }

  function hasHiddenSegment(parts: string[]) {
    return parts.some(part => part.startsWith('.'))
  }

  function getOrCreateFolder(node: { folders: Record<string, any> }, part: string) {
    const existingKey = Object.keys(node.folders).find(
      key => key.toLowerCase() === part.toLowerCase()
    )

    if (existingKey) {
      return node.folders[existingKey]
    }

    node.folders[part] = { name: part, folders: {}, files: [] }
    return node.folders[part]
  }

  // Ensure filesystem folders exist even if they have no notes yet.
  for (const folderPath of props.folders || []) {
    const p = String(folderPath || '').replace(/^\//, '')
    if (!p) continue
    const parts = p.split('/').filter(Boolean)
    if (hasHiddenSegment(parts)) continue
    let node = root
    for (const part of parts) {
      node = getOrCreateFolder(node, part)
    }
  }

  for (const it of items || []) {
    const rawPath = it.path || ''
    const p = rawPath.replace(/^\//, '')
    if (!p) continue
    
    const parts = p.split('/')
    if (hasHiddenSegment(parts)) continue

    const slugRoute = normalizeRoute(String(it.slug || ''))
    const pathRoute = normalizeRoute(rawPath || p)
    const canonicalRoute = slugRoute || pathRoute
    const fileKey = canonicalRoute.toLowerCase()
    if (seenFileKeys.has(fileKey)) continue
    seenFileKeys.add(fileKey)

    let node = root
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      node = getOrCreateFolder(node, part)
    }
    const filename = parts[parts.length - 1]
    node.files.push({
      title: it.title || filename,
      path: p,
      slug: it.slug,
      route: canonicalRoute
    })
  }
  return root
}

const tree = computed(() => buildTree(props.items))

// Get current folder contents based on currentPath
const currentFolder = computed(() => {
  let node = tree.value
  if (props.currentPath) {
    const parts = props.currentPath.split('/').filter(p => p)
    for (const part of parts) {
      if (node.folders[part]) {
        node = node.folders[part]
      } else {
        return null
      }
    }
  }
  return node
})

const folderItems = computed(() => {
  if (!currentFolder.value) return []
  // Show folders first (sorted), then files
  const folders = Object.entries(currentFolder.value.folders)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, folder]) => ({ name, folder, isFolder: true }))
  const files = currentFolder.value.files
    .sort((a, b) => (a.title || a.path).localeCompare(b.title || b.path))
    .map(f => ({ ...f, isFolder: false }))
  return [...folders, ...files]
})

function handleSelect(item) {
  if (item.isFolder) {
    const newPath = props.currentPath ? `${props.currentPath}/${item.name}` : item.name
    emit('navigate', newPath)
  } else {
    emit('select', item.route || `/${item.path}`)
  }
}

function itemLabel(item) {
  return item.name || item.title || item.path
}
</script>

<template>
  <div class="file-tree-nav">
    <div v-if="!folderItems || folderItems.length === 0" class="text-center text-gray-500">
      <p>No items in this folder</p>
    </div>
    <div v-else class="panel-list">
      <button 
        v-for="item in folderItems" 
        :key="item.name || item.path"
        @click="handleSelect(item)"
        :class="[
          'item-button text-slate-900 hover:bg-slate-200/40 dark:text-[#c9d1d9] dark:hover:bg-[#1c2128]',
          item.isFolder ? 'is-folder' : 'is-file'
        ]"
      >
        <span class="label text-slate-900 dark:text-[#c9d1d9]">{{ itemLabel(item) }}</span>
        <span class="right-icons text-slate-500 dark:text-[#8b949e]">
          <span v-if="item.isFolder" class="arrow">›</span>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.file-tree-nav {
  width: 100%;
}

.panel-list {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: transparent;
  box-shadow: none;
}

.item-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.15rem 1.3rem;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.25);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;
  font-size: 1rem;
}

.item-button:last-child {
  border-bottom: 0;
}

.label {
  flex: 1;
  font-weight: 500;
  font-size: 1.05rem;
  line-height: 1.2;
}

.right-icons {
  display: inline-flex;
  align-items: center;
  gap: 0;
}

.arrow {
  font-size: 1.35rem;
  line-height: 1;
}

@media (max-width: 640px) {
  .item-button {
    padding: 1rem 1.05rem;
  }

  .label {
    font-size: 1rem;
  }
}
</style>
