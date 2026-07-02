<script setup lang="ts">
const { data: projects } = await useAsyncData('all-projects', () => {
  return queryCollection('content')
    .where('is_published', '=', true)
    .where('is_project', '=', true)
    .order('date_created', 'DESC')
    .select('title', 'description', 'path', 'slug', 'is_project', 'tags', 'date_created')
    .all()
})

const filteredProjects = computed(() => {
  return (projects.value || []).map(i => ({
    title: i.title ?? '',
    description: i.description,
    path: i.path,
    slug: i.slug ?? i.path ?? '',
    is_project: i.is_project,
    tags: i.tags,
    date_created: i.date_created
  }))
})
</script>

<template>
  <section class="py-12">
    <div class="max-w-3xl mx-auto">
      <div class="mt-6">
        <ArticleList :items="filteredProjects" />
      </div>
    </div>
  </section>
</template>
