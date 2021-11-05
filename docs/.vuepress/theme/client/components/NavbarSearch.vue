<template>
  <div class="search-box" v-if="show">
    <svg viewBox="0 0 20 20">
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        stroke="currentColor"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
    <input
      type="text"
      id="search-box"
      :class="{ focus: text }"
      v-model="text"
    />
  </div>
</template>

<script setup lang="ts">
import { usePageData } from "@vuepress/client";
import { watchEffect, ref, computed } from "vue";
import { useWikiInfos } from "../composables";

const text = ref("");
const cates = useWikiInfos();
watchEffect(() => {
  if (!cates.value) {
    return
  }
  const keywords = text.value.split(" ").filter((s) => s !== "");
  const infos = cates.value.flatMap((c) => c.infos);
  for (const info of infos) {
    if (keywords.length > 0) {
      let s = info.main.replace(/<[^>]*>/g, "");
      let found = keywords.some(w => s.includes(w));
      info.classes.fade = !found;
    } else {
      info.classes.fade = false;
    }
  }
});

const pageData = usePageData()
const show = computed(() => {
  const layout = pageData.value.frontmatter.layout
  return layout === 'Item' || layout === 'Perk'
})
</script>
