//https://vitepress.vuejs.org/guide/theme-introduction#customizing-css
import { ThemeSettings } from "../../src/custom/theme";
import Theme from "vitepress/theme";
import "../../src/styles/imports.css";

const CustomTheme = {
  extends: Theme,
  ...ThemeSettings,
};

export default CustomTheme;
