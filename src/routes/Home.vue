<script setup lang="ts">
import { ref } from "vue";
import Marquee from "../components/Marquee.vue";
import MainLayout from "../layout/MainLayout.vue";

const data = ref([
  { src: "/images/home/test.png", alt: "/images/home/test.png" },
  { src: "/images/home/test.png", alt: "/images/home/test.png" },
  { src: "/images/home/test.png", alt: "/images/home/test.png" },
  { src: "/images/home/test.png", alt: "/images/home/test.png" },
  { src: "/images/home/test.png", alt: "/images/home/test.png" },
  { src: "/images/home/test.png", alt: "/images/home/test.png" },
]);
</script>

<template>
  <main-layout>
    <div class="home">
      <div class="marquees">
        <div class="marquees-wrapper">
          <Marquee :data="data" href="/q-photo">
            <template #title>
              <img
                src="/images/home/q-photo.png"
                alt="Q版照片"
                class="q-photo"
              />
            </template>
          </Marquee>
          <Marquee :data="data" :reverse="true" href="/ai-photo">
            <template #title>
              <img
                src="/images/home/ai-photo.png"
                alt="AI照片"
                class="ai-photo"
              />
            </template>
          </Marquee>
          <Marquee :data="data" href="/3d-photo">
            <template #title>
              <img
                src="/images/home/3d-photo.png"
                alt="3D照片"
                class="three-d-photo"
              />
            </template>
          </Marquee>
        </div>
      </div>
      <img
        src="/images/home/marquee-bg.png"
        alt="marquee-bg"
        class="marquee-bg"
      />
    </div>
  </main-layout>
</template>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background-image: url("/images/q-photo/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .marquee-bg {
    width: 1080px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .marquees {
    width: 1080px;
    height: 1607px;
    position: absolute;
    top: 313px;
    left: 0;
    overflow: hidden;
    z-index: 1;
    .marquees-wrapper {
      position: relative;
      top: -28px;
      transform: rotate(-9deg);
      .q-photo {
        width: 199px;
        margin-left: 125px;
        transform: rotate(9deg);
      }
      .ai-photo {
        width: 162px;
        margin-left: calc(100% - 150px);
        transform: rotate(9deg);
      }
      .three-d-photo {
        width: 182px;
        margin-left: -50px;
        transform: rotate(9deg);
      }
    }
  }
}
</style>
