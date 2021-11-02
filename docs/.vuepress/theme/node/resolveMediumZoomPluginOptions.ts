import type { MediumZoomPluginOptions } from '@vuepress/plugin-medium-zoom'
import type { DefaultThemePluginsOptions } from '../shared'

/**
 * Resolve options for @vuepress/plugin-medium-zoom
 */
export const resolveMediumZoomPluginOptions = (
  themePlugins: DefaultThemePluginsOptions
): MediumZoomPluginOptions | boolean => {
  if (themePlugins?.mediumZoom === false) {
    return false
  }

  return {
    selector:
      '.content > img, .content :not(a) > img',
    zoomOptions: {},
    // should greater than page transition duration
    delay: 400,
  }
}
