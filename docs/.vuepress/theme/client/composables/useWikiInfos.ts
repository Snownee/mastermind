import { usePageData } from "@vuepress/client";
import { computed } from "vue";
import { MastermindThemePageData } from "../..";

export const useWikiInfos = () => {
  const page = usePageData<MastermindThemePageData>();
  return computed(() => {
    return page.value.wikiInfos;
  });
};