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
        target: "http://hfotion.cn:20005",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
});
