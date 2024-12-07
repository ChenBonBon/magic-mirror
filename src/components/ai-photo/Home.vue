<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { useCountdown } from "../../hooks/useCountdown";
import { getSessionId } from "../../services/session";
import { useAppStore } from "../../useAppStore";
import { closeCamera, openCamera } from "../../utils/camera";
import Camera from "../Camera.vue";
import Navigator from "../Navigator.vue";
import PhotographGroup from "../PhotographGroup.vue";

const props = defineProps<{
  onNext: () => void;
}>();

const cameraRef = useTemplateRef("camera");

const store = useAppStore();
const { time, isTiming, start } = useCountdown(3);

const stream = ref();

async function handleClickPhotograph() {
  if (store.hasPhoto) {
    store.clearPhoto();
    if (cameraRef.value && cameraRef.value.video) {
      stream.value = await openCamera(cameraRef.value.video);
    }

    return;
  }

  setTimeout(() => {
    if (cameraRef.value && cameraRef.value.canvas) {
      const context = cameraRef.value.canvas.getContext("2d");
      if (context && cameraRef.value.video) {
        context.translate(cameraRef.value.video.width, 0);
        context.scale(-1, 1);
        context.drawImage(
          cameraRef.value.video,
          0,
          0,
          cameraRef.value.video.width,
          cameraRef.value.video.height
        );
        const data = cameraRef.value.canvas.toDataURL("image/png");
        store.setOriginalImage(data);

        cameraRef.value.canvas.toBlob((blob) => {
          if (blob) {
            store.setPhoto(blob);
          }
        });
      }
    }
  }, 3000);

  start();
}

function handleClickPhotographConfirm() {
  props.onNext();
}

onMounted(async () => {
  if (!window.localStorage.getItem("magic-mirror-sessionId")) {
    getSessionId("aiPhoto");
  }

  store.clearPhoto();
  store.clearOriginalImage();

  if (cameraRef.value && cameraRef.value.video) {
    stream.value = await openCamera(cameraRef.value.video);
  }
});

onBeforeUnmount(() => {
  if (stream.value) {
    closeCamera(stream.value);
  }
});
</script>

<template>
  <navigator
    :active="{
      src: '/images/navigator/ai-photo-active.png',
      alt: 'AI摄影',
      width: 130,
    }"
    :inactives="[
      {
        src: '/images/navigator/3d-photo.png',
        alt: '3D重建',
        width: 81,
        href: '/3d-photo',
      },
      {
        src: '/images/navigator/q-photo.png',
        alt: 'Q版照片',
        width: 85,
        href: '/q-photo',
      },
    ]"
  />
  <camera ref="camera" :time="time" :is-timing="isTiming" />
  <photograph-group
    :showConfirm="store.hasPhoto"
    @click-photograph="handleClickPhotograph"
    @click-photograph-confirm="handleClickPhotographConfirm"
  />
</template>

<style lang="less" scoped></style>
