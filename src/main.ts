import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import Vue3Marquee from "vue3-marquee";
import App from "./App.vue";
import ThreeDPhoto from "./routes/3DPhoto.vue";
import AIPhoto from "./routes/AIPhoto.vue";
import Home from "./routes/Home.vue";
import QPhoto from "./routes/QPhoto.vue";
import "./style.css";

const routes = [
  { path: "/", component: Home },
  { path: "/q-photo", component: QPhoto },
  { path: "/3d-photo", component: ThreeDPhoto },
  { path: "/ai-photo", component: AIPhoto },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(ToastPlugin)
  .use(pinia)
  .use(Vue3Marquee)
  .mount("#app");
