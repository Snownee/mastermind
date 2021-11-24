<template>
  <div
    class="search-box"
    v-if="show"
    :class="{ focus: focused || mouseover || text }"
  >
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
      placeholder="键入欲知之物"
      v-model.trim="text"
      @focus="focused = true"
      @blur="focused = false"
    />
    <div
      class="filters"
      v-if="frontmatter.searchFilter"
      @mouseenter="mouseover = true"
      @mouseleave="mouseover = false"
    >
      <div v-for="(o, i) in filters" :key="o">
        <p>{{ o.text }}</p>
        <p>
          <label v-for="tag in Object.keys(o.tags)" :key="tag">
            <input type="checkbox" v-model="filters[i].tags[tag]" />{{ tag }}
          </label>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageFrontmatter } from "@vuepress/client";
import { watchEffect, ref, computed, onMounted, reactive, watch } from "vue";
import { WikiPageFrontmatter } from "../../shared";
import { useWikiInfos } from "../composables";

const text = ref("");
const cates = useWikiInfos();

const frontmatter = usePageFrontmatter<WikiPageFrontmatter>();
const show = computed(() => {
  const layout = frontmatter.value.layout;
  return layout === "Item" || layout === "Perk";
});

const focused = ref(false);
const mouseover = ref(false);

const filters = reactive<FilterGroup[]>([]);

const updateSearch = () => {
  if (!cates.value) {
    return;
  }
  for (const filter of filters) {
    filter.checked = Object.values(filter.tags).includes(true);
  }
  const keywords = text.value.split(" ").filter((s) => s !== "");
  const infos = cates.value.flatMap((c) => c.infos);
  for (const info of infos) {
    let found = true;
    if (keywords.length > 0) {
      let s = info.main.replace(/<[^>]*>/g, "");
      found = keywords.some((w) => s.includes(w));
    }
    if (found) {
      a: for (const filter of filters) {
        if (filter.checked) {
          for (const [k, v] of Object.entries(filter.tags)) {
            if (v && !info.tags.includes(k)) {
              found = false;
              break a;
            }
          }
        }
      }
    }
    info.classes.fade = !found;
  }
};

watch(() => [...filters], updateSearch, { deep: true });

interface FilterGroup {
  text: string;
  checked: boolean;
  tags: object;
}

onMounted(() => {
  if (frontmatter.value.searchFilter) {
    for (const o of frontmatter.value.searchFilter!) {
      const group: FilterGroup = {
        text: o.text,
        checked: false,
        tags: {},
      };
      for (const tag of o.filters.split(" ")) {
        group.tags[tag] = false;
      }
      filters.push(group);
    }
  }
});

watchEffect(updateSearch);
</script>
