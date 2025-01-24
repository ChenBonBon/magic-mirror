import { createPinia } from "pinia";
import "swiper/swiper-bundle.css";
import {
  ActionSheet,
  ConfigProvider,
  Loading,
  Overlay,
  Progress,
  Swipe,
  SwipeItem,
} from "vant";
import "vant/lib/index.css";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import MainLayout from "./layouts/MainLayout.vue";
import "./style.css";

// const Home = () => import("./routes/Home.vue");
const Standby = () => import("./routes/Standby.vue");
const StyleSelection = () => import("./routes/StyleSelection.vue");
const CollectionMethods = () => import("./routes/CollectionMethods.vue");
const PhotoCollection = () => import("./routes/PhotoCollection.vue");
const Generating = () => import("./routes/Generating.vue");
const ChoosePhotos = () => import("./routes/ChoosePhotos.vue");
const Cart = () => import("./routes/Cart.vue");
const Payment = () => import("./routes/Payment.vue");
const Print = () => import("./routes/Print.vue");

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: Standby },
      // {
      //   path: "/standby",
      //   component: Standby,
      // },
      {
        path: "/style-selection",
        component: StyleSelection,
      },
      {
        path: "/collection-methods",
        component: CollectionMethods,
      },
      {
        path: "/photo-collection",
        component: PhotoCollection,
      },
      {
        path: "/generating",
        component: Generating,
      },
      {
        path: "/choose-photos",
        component: ChoosePhotos,
      },
      {
        path: "/cart",
        component: Cart,
      },
      {
        path: "/payment",
        component: Payment,
      },
      {
        path: "/print",
        component: Print,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    // navigator.serviceWorker.register("/sw.js").then(
    //   function (registration) {
    //     // Registration was successful
    //     console.log("ServiceWorker registration successful");
    //   },
    //   function (err) {
    //     // Registration failed
    //     console.log("ServiceWorker registration failed: ", err);
    //   }
    // );
  });
}

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(Overlay)
  .use(ActionSheet)
  .use(Swipe)
  .use(SwipeItem)
  .use(Loading)
  .use(ConfigProvider)
  .use(Progress)
  .mount("#app");
