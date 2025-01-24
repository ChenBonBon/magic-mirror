<template>
  <div class="relative w-full h-full">
    <back @back="handleBack" />
    <img
      :src="title"
      alt="采集方式"
      class="absolute top-[117px] left-[298px] w-[493px]"
    />
    <img
      :src="takePhotos"
      alt="现场拍摄"
      class="absolute top-[610px] left-[349px] w-[392px]"
      @click="handleTakePhotos"
    />
    <img
      :src="uploadPhotos"
      alt="上传照片"
      class="absolute top-[1014px] left-[354px] w-[392px]"
      @click="handleUploadPhotos"
    />
    <cursor class="absolute top-[1211px] left-[658px] w-[132px]" />
    <audio src="/audios/collection-methods.mp3" autoplay loop />

  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import takePhotos from "../assets/images/collection-methods/take-photos.png";
import title from "../assets/images/collection-methods/title.png";
import uploadPhotos from "../assets/images/collection-methods/upload-photos.png";
import Back from "../components/Back.vue";
import Cursor from "../components/Cursor.vue";

const router = useRouter();
const route = useRoute();

function handleTakePhotos() {
  router.push({ path: "photo-collection", query: route.query });
}

function handleUploadPhotos() {}

function handleBack() {
  router.push("/style-selection");
}
</script>

<style lang="less" scoped></style>
