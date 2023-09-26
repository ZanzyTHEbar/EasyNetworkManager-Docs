// .vitepress/config.ts
import { defineConfig } from "vitepress";
import { customTheme } from "../src/custom/theme";

export default defineConfig({
  outDir: "./.vitepress/dist",
  srcDir: "./src/pages",
  // Note: This is not available on Github Pages - only on Netlify and Vercel
  // https://vitepress.dev/guide/routing#generating-clean-url
  //cleanUrls: true,
  ignoreDeadLinks: true,
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "ESP32 ESP8266 Arduino WiFi Network Manager Library Espressif IoT Platformio REST API Web Server WebSockets OTA MQTT CoAP TCP UDP TLS DNS mDNS RESTFUL HTTP Client SoftAP Static IP Credentials EEPROM LittleFS",
      },
    ],
  ],
  markdown: {
    theme: "material-theme-palenight",
    lineNumbers: true,
  },
  lastUpdated: true,
  title: "EasyNetworkManager Docs",
  description: "Official documentation for the EasyNetworkManager Library.",
  themeConfig: customTheme,
});
