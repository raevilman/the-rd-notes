<script setup lang="ts">
const router = useRouter()

const menuItems = [
  { label: 'Notes', icon: '📝', path: '/notes' },
  { label: 'Projects', icon: '🚀', path: '/projects' },
  { label: 'Tags', icon: '🏷️', path: '/tags' }
]

function navigate(path: string) {
  router.push(path)
}
</script>

<template>
  <section class="py-12">
    <div class="max-w-3xl mx-auto">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Hi, I'm RD</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">Explore brief notes and insights from my journey building side projects.</p>
      </div>

      <div class="flex justify-center">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
          <button
            v-for="item in menuItems"
            :key="item.path"
            @click="navigate(item.path)"
            class="menu-card border border-slate-300/40 bg-white/40 text-slate-900 hover:border-slate-400/60 hover:bg-slate-100/70 dark:border-[#30363d] dark:bg-[#161b22] dark:text-[#c9d1d9] dark:hover:border-[#58a6ff]/35 dark:hover:bg-[#1c2128]"
          >
            <div class="text-3xl mb-2">{{ item.icon }}</div>
            <h2 class="text-xl font-semibold">{{ item.label }}</h2>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-card:hover {
  transform: translateY(-2px);
}
</style>

