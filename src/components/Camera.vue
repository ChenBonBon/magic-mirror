<script setup lang="ts">
import { useTemplateRef } from "vue";
import { useAppStore } from "../useAppStore";

const video = useTemplateRef("video");
const canvas = useTemplateRef("canvas");

const store = useAppStore();

defineExpose({
  video,
  canvas,
});
</script>

<template>
  <div class="camera-wrapper">
    <img src="/images/camera-line.png" alt="line" class="line" />
    <video
      ref="video"
      width="715"
      height="715"
      class="video"
      v-show="!store.hasPhoto"
    ></video>
    <canvas
      v-show="store.hasPhoto"
      ref="canvas"
      class="canvas"
      width="715"
      height="715"
    ></canvas>
  </div>
</template>

<style lang="less" scoped>
.camera-wrapper {
  position: absolute;
  top: 591px;
  left: 162px;
  width: 797px;
  height: 797px;
  background-image: url("/images/camera-wrapper.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .line {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -59%);
  }
  .photo,
  .video,
  .canvas {
    border-radius: 50%;
    transform: rotateY(180deg);
  }
}
</style>
