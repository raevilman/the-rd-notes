<template>
  <div
    v-if="visible"
    class="bg-gray-950 dark:bg-gray-900 border-b border-gray-800 text-white px-4 py-2.5"
  >
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div class="w-6" />
        <div class="flex flex-1 items-center justify-center gap-3">
          <img src="/images/kowlt-logo.png" alt="Kowlt" class="w-6 h-6 rounded-md flex-shrink-0" />
          <p class="text-sm text-gray-200">
            <span class="font-semibold text-white">Kowlt</span>
            — pick any topic, read, quiz yourself, and retain it.
            <a
              href="https://kowlt.com"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-1 underline underline-offset-2 text-white font-medium hover:text-gray-300 transition-colors whitespace-nowrap"
            >Try it  →</a>
          </p>
        </div>
        <button
          @click="dismiss"
          aria-label="Dismiss banner"
          class="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1 rounded"
        >
          <UIcon name="i-lucide-x" class="w-4 h-4" />
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">
const visible = ref(true)

function dismiss() {
  visible.value = false
}
</script>
