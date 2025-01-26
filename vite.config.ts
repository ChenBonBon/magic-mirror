import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/print": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/print/, ""),
      },
      "/api": {
        target: "http://www.hfotion.cn:8088",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
});
