<template>
  <figure class="content">
    <slot name="top" />

    <div v-if="info" v-html="info.main"></div>

    <slot name="bottom" />
  </figure>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { WikiInfo } from '../../wiki'

const props = defineProps({
  info: {
    type: Object as PropType<WikiInfo>,
    required: false,
  }
})
</script>
