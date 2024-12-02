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
    <img
      v-show="store.hasPhoto"
      :src="store.photo"
      alt="photo"
      width="715"
      height="715"
      class="photo"
    />
    <video
      ref="video"
      width="715"
      height="715"
      class="video"
      v-show="!store.hasPhoto"
    ></video>
    <canvas ref="canvas" class="canvas" width="715" height="715"></canvas>
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
  .photo,
  .video {
    border-radius: 50%;
    transform: rotateY(180deg);
  }
  .canvas {
    display: none;
  }
}
</style>
