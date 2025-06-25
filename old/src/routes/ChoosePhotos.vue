<template>
  <div class="relative w-full h-full">
    <back @back="handleBack" />
    <img
      :src="title"
      alt="选择相片"
      class="absolute top-[118px] left-[355px] w-[378px]"
    />
    <countdown @end="handleBack" class="absolute top-[312px] left-[422px]" />
    <image-list
      :list="list"
      class="top-[399px] left-0"
      @change="handleChange"
    />
    <img
      :src="tip"
      alt="点选你想要留下的相片，一并加入购物车吧"
      class="absolute top-[1596px] left-[213px] w-[653px]"
    />
    <img
      v-show="selectedPhotoList.length > 0"
      :src="addToCartIcon"
      class="absolute top-[1657px] left-[371px] w-[346px]"
      @click="handleAddToCart"
    />
    <audio src="/audios/choose-photos.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import addToCartIcon from "../assets/images/choose-photos/add-to-cart.png";
import tip from "../assets/images/choose-photos/tip.png";
import title from "../assets/images/choose-photos/title.png";
import Back from "../components/Back.vue";
import Countdown from "../components/choose-photos/Countdown.vue";
import ImageList from "../components/choose-photos/ImageList.vue";
import type { GeneratedImage } from "../models/image";
import { addToCart } from "../services/cart";
import { getGeneratedImages } from "../services/image";

const router = useRouter();
const route = useRoute();

const list = ref<GeneratedImage[]>([]);
const selectedPhotoList = ref<number[]>([]);

async function getGeneratedImageList() {
  const res = await getGeneratedImages();

  if (res) {
    list.value = res.data;
  }
}

async function handleAddToCart() {
  if (selectedPhotoList.value.length === 0) {
    return;
  }

  const res = await addToCart(selectedPhotoList.value);

  if (res) {
    router.push({ path: "/cart", query: route.query });
  }
}

function handleChange(value: number[]) {
  selectedPhotoList.value = value;
}

function handleBack() {
  router.push({
    path: "/collection-methods",
    query: {
      styleId: route.query.styleId,
    },
  });
}

onMounted(() => {
  getGeneratedImageList();
});
</script>

<style lang="less" scoped></style>
