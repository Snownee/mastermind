<template>
  <a v-html="info.icon" :href="'#'+info.head" class="item"></a>
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
