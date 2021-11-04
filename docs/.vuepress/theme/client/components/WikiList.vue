<template>
  <figure class="list" ref="root">
    <slot>
      <div v-for="cate in cates" :key="cate">
        <h2 v-if="cates.length > 1">
          {{ cate.name }}
        </h2>
        <div class="list-container">
          <WikiListChild
            v-for="info in cate.infos"
            :info="info"
            :key="info"
            :class="info.classes"
            :ref="info.head"
            @click="click(info)"
            @mouseover="mouseover(info)"
          />
        </div>
      </div>
    </slot>
  </figure>
</template>

<script setup lang="ts">
import { usePageData } from "@vuepress/client";
import type { MastermindThemePageData } from "../../shared";
import {
  computed,
  getCurrentInstance,
  onMounted,
  Ref,
  ref,
  useSlots,
} from "vue";
import WikiListChild from "./WikiListChild.vue";
import { WikiInfo } from "../../wiki";
import { MaybeElementRef, unrefElement } from "@vueuse/core";

const useWikiInfos = () => {
  const page = usePageData<MastermindThemePageData>();
  return computed(() => {
    return page.value.wikiInfos;
  });
};

const cates = useWikiInfos();
let currentInfo: Ref<WikiInfo | null> = ref(cates.value![0].infos[0]);
let selectedInfo: Ref<WikiInfo | null> = ref(null);

const click = (info: WikiInfo) => {
  if (selectedInfo.value === info) {
    selectedInfo.value = null;
    if (info) {
      info.classes.selected = false;
    }
  } else {
    if (selectedInfo.value) {
      selectedInfo.value.classes.selected = false;
    }
    selectedInfo.value = info;
    if (info) {
      info.classes.selected = true;
    }
  }
  currentInfo.value = info;
};

const mouseover = (info: WikiInfo) => {
  if (selectedInfo.value === null) {
    currentInfo.value = info;
  }
};

const root: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  const parts = document.URL.split("#");
  if (parts.length > 1) {
    const anchor = decodeURI(parts[1]);
    for (const cate of cates.value!) {
      for (const info of cate.infos) {
        if (info.head === anchor) {
          click(info);
          const el = unrefElement(
            getCurrentInstance()!.refs[info.head] as MaybeElementRef
          );
          const docRect = document.documentElement.getBoundingClientRect();
          const elRect = el!.getBoundingClientRect();
          root.value!.scrollTo(
            elRect.left - docRect.left - elRect.width / 2,
            elRect.top - docRect.top - elRect.height / 2
          );
          break;
        }
      }
    }
  }
});

defineExpose({ currentInfo, selectedInfo, click });
</script>
