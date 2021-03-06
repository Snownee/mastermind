import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'

const domain = 'https://snownee.github.io'
const base = '/mastermind/'

export default defineUserConfig<DefaultThemeOptions>({
  base,
  lang: 'zh-CN',
  title: '黎明杀机图鉴-卡里普索的迷雾笔记',
  description: '黎明杀机-非官方-个人向-图鉴资料站',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `${base}images/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `${base}images/icons/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: `${base}app.webmanifest` }],
    // ['meta', { name: 'application-name', content: 'VuePress' }],
    // ['meta', { name: 'apple-mobile-web-app-title', content: 'VuePress' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `${base}images/icons/apple-touch-icon.png`, sizes: '180x180' },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: `${base}safari-pinned-tab.svg`,
        color: '#262c34',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#262c34' }],
    ['meta', { name: 'theme-color', content: '#000000' }],
  ],

  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
  },

  markdown: {
    anchor: false,
    breaks: true
  },

  plugins: [
    ['@vuepress/plugin-pwa'],
    [
      '@vuepress/plugin-pwa-popup',
      {
        locales: {
          '/': {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
        },
      },
    ],
    'vuepress-plugin-attrs',
    [path.resolve(__dirname, 'plugins/info-processor')],
    [
      path.resolve(__dirname, 'plugins/seo'),
      {
        type: () => 'website',
        title: ($page, $site) =>
          $page.frontmatter.ogTitle || $page.frontmatter.title || $page.title || $site.title,
        description: ($page, $site) =>
          $page.frontmatter.description || $site.description,
        url: (_, $site, path) =>
          $site.themeConfig.domain + $site.base + path.substr(1),
        image: (_, $site) =>
          $site.themeConfig.domain + $site.base + $site.themeConfig.logo.substr(1),
      }
    ],
  ],

  theme: path.resolve(__dirname, 'theme'),
  themeConfig: {
    domain,
    logo: '/images/hero.png',
    brandTitle: '主页',
    darkMode: false,
    sidebar: false,
    contributors: false,
    themePlugins: {
      backToTop: false,
    },
    lastUpdated: false,
    navbar: [
      {
        text: '技能图鉴',
        children: [
          {
            text: "逃生者技能",
            link: "/perk/survivors/"
          },
          {
            text: "杀手技能",
            link: "/perk/killers/"
          },
        ],
      },
      {
        text: '物品图鉴',
        children: [
          {
            text: "逃生者物品",
            link: "/item/survivors/"
          },
          {
            text: "杀手附加品",
            link: "/item/killers/"
          },
          {
            text: "祭品图鉴",
            link: "/item/favors/"
          },
        ],
      },
      {
        text: '其他信息',
        children: [
          {
            text: "关于本站",
            link: "/about/site/"
          },
          {
            text: "关于作者",
            link: "/about/author/"
          },
          // {
          //   text: "卡里普索",
          //   link: "/about/calypso/"
          // },
          {
            text: "特别感谢",
            link: "/about/thanks/"
          },
          {
            text: "网站日志",
            link: "/about/changelog/"
          },
        ],
      },
    ],
  },
})