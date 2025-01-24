<template>
  <div class="relative w-full h-full" @click="handleClick">
    <img
      :src="title"
      alt="欢迎使用次元魔镜"
      class="absolute top-[132px] left-[14px] w-[1062px]"
    />
    <img
      :src="start"
      alt="点击屏幕开始体验"
      class="absolute top-[1613px] left-[218px] w-[655px]"
    />
    <div class="w-full absolute top-[558px] left-1/2 -translate-x-1/2">
      <swiper />
    </div>
    <cursor class="absolute top-[1113px] left-[654px] w-[202px]" />
    <img :src="tip" class="absolute top-[1742px] left-[276px] w-[538px]" />
    <audio src="/audios/standby.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import start from "../assets/images/standby/start.png";
import tip from "../assets/images/standby/tip.png";
import title from "../assets/images/standby/title.png";
import Cursor from "../components/Cursor.vue";
import Swiper from "../components/standby/Swiper.vue";

const router = useRouter();

function handleClick() {
  router.push("/style-selection");
}
</script>

<style lang="less" scoped></style>
