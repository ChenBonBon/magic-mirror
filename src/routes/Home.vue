<script setup lang="ts">
import { onMounted, ref } from "vue";
import Marquee from "../components/Marquee.vue";
import MainLayout from "../layout/MainLayout.vue";
import { useAppStore } from "../useAppStore";

const store = useAppStore();

const qData = ref([
  { src: "/images/home/q-1.png", alt: "/images/home/q-1.png" },
  { src: "/images/home/q-2.png", alt: "/images/home/q-2.png" },
  { src: "/images/home/q-3.png", alt: "/images/home/q-3.png" },
  { src: "/images/home/q-4.png", alt: "/images/home/q-4.png" },
]);

const aiData = ref([
  { src: "/images/home/ai-1.png", alt: "/images/home/ai-1.png" },
  { src: "/images/home/ai-2.png", alt: "/images/home/ai-2.png" },
  { src: "/images/home/ai-3.png", alt: "/images/home/ai-3.png" },
  { src: "/images/home/ai-4.png", alt: "/images/home/ai-4.png" },
]);

const threeDData = ref([
  { src: "/images/home/3d-1.gif", alt: "/images/home/3d-1.gif" },
  { src: "/images/home/3d-2.gif", alt: "/images/home/3d-2.gif" },
  { src: "/images/home/3d-3.gif", alt: "/images/home/3d-3.gif" },
  { src: "/images/home/3d-4.gif", alt: "/images/home/3d-4.gif" },
]);

onMounted(() => {
  window.localStorage.removeItem("magic-mirror-sessionId");
  store.clearPhoto();
});
</script>

<template>
  <main-layout>
    <div class="home">
      <div class="marquees">
        <div class="marquees-wrapper">
          <Marquee id="cute" :data="qData" href="/q-photo">
            <template #title>
              <div class="q-photo">
                <img
                  src="/images/home/q-photo.png"
                  alt="Q版照片"
                  class="q-photo-img"
                />
              </div>
            </template>
          </Marquee>
          <Marquee id="aiPhoto" :data="aiData" :reverse="true" href="/ai-photo">
            <template #title>
              <div class="ai-photo">
                <img
                  src="/images/home/ai-photo.png"
                  alt="AI照片"
                  class="ai-photo-img"
                />
              </div>
            </template>
          </Marquee>
          <Marquee id="threeDPhoto" :data="threeDData" href="/3d-photo">
            <template #title>
              <div class="three-d-photo">
                <img
                  src="/images/home/3d-photo.png"
                  alt="3D照片"
                  class="three-d-photo-img"
                />
              </div>
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
      top: 0;
      transform: rotate(-9deg);
      .q-photo {
        width: 800px;
        margin-left: 135px;
        .q-photo-img {
          width: 100%;
        }
      }
      .ai-photo {
        width: 700px;
        margin: 75px 0 0 calc(100% - 700px);
        .ai-photo-img {
          width: 100%;
        }
      }
      .three-d-photo {
        width: 800px;
        margin: 75px 0 0 -50px;
        .three-d-photo-img {
          width: 100%;
        }
      }
    }
  }
}
.sub-title {
  color: #ffffff;
  transform: rotate(-9deg);
  flex-shrink: 0;
}
</style>
