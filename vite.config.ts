import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://8u43icje.dongtaiyuming.net",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
});
