<template>
  <a :href="'#'+info.head" class="item" :class="info.classes">
    <img :src="info.icon" :alt="info.head">
  </a>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { WikiInfo } from '../../wiki'

const props = defineProps({
  info: {
    type: Object as PropType<WikiInfo>,
    required: true,
  }
})
</script>
