import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://123.60.158.180:9135",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
});
