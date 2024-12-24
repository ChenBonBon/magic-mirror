<script setup lang="ts">
import { useRouter } from "vue-router";
import { Vue3Marquee } from "vue3-marquee";

const props = defineProps<{
  data: { src: string; alt: string }[];
  href: string;
  reverse?: boolean;
  video?: boolean;
}>();

const router = useRouter();

function navigate() {
  router.push(props.href);
}
</script>

<template>
  <div class="marquee-wrapper" @click="navigate">
    <slot name="title" />
    <Vue3Marquee :direction="reverse ? 'reverse' : 'normal'">
      <video
        v-if="video"
        v-for="item in data"
        :src="item.src"
        :alt="item.alt"
        width="466"
        height="385"
        class="marquee-item"
        autoplay
        loop
        muted
      />
      <img
        v-else
        v-for="item in data"
        :src="item.src"
        :alt="item.alt"
        width="466"
        height="385"
        class="marquee-item"
      />
    </Vue3Marquee>
  </div>
</template>

<style lang="less" scoped>
.marquee-item {
  margin: 0 15px;
}
</style>
