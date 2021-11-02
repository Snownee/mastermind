<template>
  <main class="page">
    <slot name="top" />

    <div class="content">
      <Content />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<script setup lang="ts">
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'
</script>
