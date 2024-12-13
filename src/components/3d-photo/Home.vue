<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { useBackToHome } from "../../hooks/useBackToHome";
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

const backToHomeTime = import.meta.env.VITE_BACK_TO_HOME_TIME;

const cameraRef = useTemplateRef("camera");

const store = useAppStore();
const { time, isTiming, start } = useCountdown(5);
const { start: startBackToHome, stop } = useBackToHome(
  parseInt(backToHomeTime, 10)
);

const stream = ref();

async function handleClickPhotograph() {
  if (isTiming.value) {
    return;
  }

  if (store.hasPhoto) {
    store.clearPhoto();
    if (cameraRef.value && cameraRef.value.video && cameraRef.value.canvas) {
      stream.value = await openCamera(cameraRef.value.video);
      const context = cameraRef.value.canvas.getContext("2d");
      if (context) {
        context.translate(cameraRef.value.video.width, 0);
        context.scale(-1, 1);
        context.clearRect(
          0,
          0,
          cameraRef.value.canvas.width,
          cameraRef.value.canvas.height
        );
      }
    }
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

        startBackToHome();
      }
    }
  }, 5000);

  stop();
  start();
}

function handleClickPhotographConfirm() {
  props.onNext();
}

onMounted(async () => {
  if (!window.localStorage.getItem("magic-mirror-sessionId")) {
    getSessionId("cute");
  }

  store.clearPhoto();
  store.clearOriginalImage();
  store.clear3DRecords();

  if (cameraRef.value && cameraRef.value.video) {
    stream.value = await openCamera(cameraRef.value.video);
  }

  startBackToHome();
});

onBeforeUnmount(() => {
  if (stream.value) {
    closeCamera(stream.value);
  }

  stop();
});
</script>

<template>
  <navigator
    :active="{
      src: '/images/navigator/3d-photo-active.png',
      alt: '3D重建',
      width: 127,
    }"
    :inactives="[
      {
        src: '/images/navigator/ai-photo.png',
        alt: 'AI摄影',
        width: 82,
        href: '/ai-photo',
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
