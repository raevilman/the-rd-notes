<template>
  <header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-xl font-semibold text-gray-900 dark:text-white">the</span>
            <div class=" h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">RD</span>
            </div>
            <span class="text-xl font-semibold text-gray-900 dark:text-white">Notes</span>
          </NuxtLink>
        </div>

        <!-- Color Mode Switch -->
        <div class="flex items-center">
          <UButton
            :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            color="gray"
            variant="ghost"
            size="sm"
            style="cursor: pointer;"
            @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
            :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
</script>
