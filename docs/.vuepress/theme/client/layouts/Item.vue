<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="navbar">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <slot name="sidebar">
      <Sidebar>
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>
    </slot>

    <slot name="page">
      <Transition
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <main class="page wiki" :class="frontmatter.wikiClass">
          <slot name="top" />

          <WikiContent
            :info="mobile ? list?.selectedInfo : list?.currentInfo"
            @click="clickContent($event, list)"
          />
          <WikiList ref="list" />

          <slot name="bottom" />
        </main>
      </Transition>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { unrefElement } from "@vueuse/core";
import {
  computed,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  Transition,
} from "vue";
import { useRouter } from "vue-router";
import type { DefaultThemePageFrontmatter } from "../../shared";
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import WikiContent from "../components/WikiContent.vue";
import WikiList from "../components/WikiList.vue";
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from "../composables";

const page = usePageData();
//console.log(page.value.wikiInfos);

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
const themeLocale = useThemeLocaleData();

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
);

// sidebar
const sidebarItems = useSidebarItems();
const isSidebarOpen = ref(false);
const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
};
const touchStart = { x: 0, y: 0 };
const onTouchStart = (e): void => {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
};
const onTouchEnd = (e): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  }
};

const mobile = ref(false);

// classes
const containerClass = computed(() => [
  {
    "no-navbar": !shouldShowNavbar.value,
    "no-sidebar": !sidebarItems.value.length,
    "sidebar-open": isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
  {
    mobile: mobile.value,
  },
]);

// close sidebar after navigation
let unregisterRouterHook;
const list = ref<HTMLElement | null>(null);

const resize = () => {
  const MOBILE_DESKTOP_BREAKPOINT = 719;
  mobile.value = window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT;

  const containers =
    unrefElement(list)?.getElementsByClassName("list-container");
  if (!containers) {
    return;
  }
  for (let i = 0; i < containers.length; i++) {
    const container = containers[i] as HTMLElement;
    const children = container.children;
    if (children.length === 0) {
      return;
    }
    const totalWidth = container.clientWidth - 20; // 20px: padding
    const width = children[0].clientWidth;
    const itemsPerLine = Math.floor(totalWidth / width);
    const paddingLeft = (totalWidth - itemsPerLine * width) * 0.5 + 10;
    container.style.paddingLeft = paddingLeft + "px";
  }
};

onMounted(() => {
  window.addEventListener("resize", resize, false);
  window.addEventListener("orientationchange", resize, false);
  resize();
  const router = useRouter();
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false);
  });
});
onUpdated(() => {
  resize();
});
onUnmounted(() => {
  window.removeEventListener("resize", resize, false);
  window.removeEventListener("orientationchange", resize, false);
  unregisterRouterHook();
});

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;

const clickContent = (event: PointerEvent, list: WikiList | null) => {
  if (mobile.value && event.target && event.target['id'] === 'content-mask') {
    list?.click(null);
  }
};
</script>
