//https://vitepress.vuejs.org/config/theme-configs
//https://vitepress.vuejs.org/guide/theme-nav#navigation-links

import type { DefaultTheme } from "vitepress";
import { inBrowser, useData } from "vitepress";
import { watchEffect, h } from "vue";
import Theme from "vitepress/theme";

//import MyLayout from '../../vue/MyLayout.vue'

const theme: DefaultTheme.Config = {
  /* logo: {
    light: "/logo_light.png",
    dark: "/logo.svg",
    alt: "EasyNetworkManager Logo",
  }, */
  siteTitle: "EasyNetworkManager Docs",
  /* Note the footer will not show when sidebar is active */
  search: {
    provider: "local",
  },
  footer: {
    message: "Released under the MIT License.",
    copyright: "Copyright © 2022-present EasyNetworkManager",
  },
  nav: [
    {
      text: "About",
      items: [
        { text: "About Us", link: "/about" },
        { text: "Development Road Map", link: "/dev_roadmap" },
      ],
    },
    { text: "Contact", link: "/contact" },
  ],
  sidebar: [
    {
      text: "Getting Started",
      collapsed: true,
      items: [
        { text: "Introduction", link: "/getting_started/intro" },
        {
          text: "Things to know before you start",
          link: "/getting_started/things_to_know",
        },
      ],
    },
    {
      text: "Library Guide",
      collapsed: true,
      items: [
        { text: "Introduction", link: "/library_guide/library" },
        {
          text: "Using Library",
          link: "/library_guide/configure_library",
        },
        { text: "MDNS", link: "/library_guide/mdns" },
        { text: "REST API", link: "/library_guide/rest_api" },
        { text: "OTA", link: "/library_guide/ota" },
        {
          text: "Updating PlatformIO",
          link: "/library_guide/update_platformio",
        },
      ],
    },
    {
      text: "Development",
      collapsed: true,
      items: [
        { text: "Docs", link: "/development/docs/dev_docs" },
        { text: "Edit Docs", link: "/development/docs/pages" },
        { text: "Standards", link: "/development/docs/standards" },
      ],
    },
  ],
  socialLinks: [
    {
      icon: "github",
      link: "https://github.com/ZanzyTHEbar/EasyNetworkManager",
    },
    { icon: "discord", link: "https://discord.gg/kkXYbVykZX" },
  ],
};

const ThemeSettings = {
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.vuejs.org/guide/extending-default-theme#layout-slots
    });
  },
  setup() {
    const { lang } = useData();
    watchEffect(() => {
      if (inBrowser) {
        document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/`;
      }
    });
  },
  async enhanceApp({ app, router, siteData }) {
    // ...
  },
};

export { theme, ThemeSettings };
