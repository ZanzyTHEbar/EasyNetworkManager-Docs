//https://vitepress.vuejs.org/guide/theme-introduction#customizing-css
import Theme from "vitepress/theme";
import { watchEffect, h } from "vue";
import { inBrowser, useData } from "vitepress";
import "../../src/styles/imports.css";

const ThemeSettings = {
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.vuejs.org/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
};

const CustomTheme = {
  extends: Theme,
  setup() {
    const { lang } = useData();
    watchEffect(() => {
      if (inBrowser) {
        document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/`;
      }
    });
  },
  
  ...ThemeSettings,
};

export default CustomTheme;
