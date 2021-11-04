<template>
  <div id="content-mask" :class="{ show }">
    <figure class="content" ref="content" @scroll="scroll">
      <slot name="top" />

      <img
        v-if="shownInfo"
        :src="shownInfo.icon"
        alt="icon"
        class="icon"
        :class="{ hide: hideIcon }"
      />
      <div v-if="shownInfo" v-html="shownInfo.main"></div>

      <slot name="bottom" />
    </figure>
  </div>
</template>

<script setup lang="ts">
import { unrefElement } from "@vueuse/core";
import { computed, PropType, ref, Ref } from "vue";
import { WikiInfo } from "../../wiki";

let lastInfo: WikiInfo | null = null;

const shownInfo = computed(() => {
  if (props.info) {
    lastInfo = props.info;
  }
  return lastInfo;
});

const props = defineProps({
  info: {
    type: Object as PropType<WikiInfo>,
    required: false,
  },
});

const show = computed(() => {
  return !!props.info;
});

const content = ref(null);
const hideIcon = ref(false);

const scroll = () => {
  hideIcon.value = (unrefElement(content)?.scrollTop ?? 0) > 0.1;
};
</script>
