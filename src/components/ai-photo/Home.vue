<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { useCountdown } from "../../hooks/useCountdown";
import { getSessionId } from "../../services/session";
import { useAppStore } from "../../useAppStore";
import { closeCamera, openCamera } from "../../utils/camera";
import Back from "../Back.vue";
import Camera from "../Camera.vue";
import Navigator from "../Navigator.vue";
import PhotographGroup from "../PhotographGroup.vue";

const props = defineProps<{
  onNext: () => void;
}>();

const startBackToHome = inject<() => void>("startBackToHome");
const clearBackToHome = inject<() => void>("clearBackToHome");

const cameraRef = useTemplateRef("camera");

const store = useAppStore();
const router = useRouter();
const { time, isTiming, start } = useCountdown(5);

const stream = ref();
const clicked = ref(false);

function handleBack() {
  router.push("/");
}

async function handleClickPhotograph() {
  if (isTiming.value) {
    return;
  }

  clicked.value = true;

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

        startBackToHome && startBackToHome();
      }
    }
  }, 5000);

  clearBackToHome && clearBackToHome();
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
  store.clearAIRecords();

  if (cameraRef.value && cameraRef.value.video) {
    stream.value = await openCamera(cameraRef.value.video);
  }

  startBackToHome && startBackToHome();
});

onBeforeUnmount(() => {
  if (stream.value) {
    closeCamera(stream.value);
  }

  clearBackToHome && clearBackToHome();
});
</script>

<template>
  <navigator
    :active="{
      src: '/images/navigator/ai-photo.png',
      alt: 'AI摄影',
      width: 200,
    }"
    :inactives="[
      {
        src: '/images/navigator/3d-photo.png',
        alt: '3D重建',
        width: 125,
        href: '/3d-photo',
      },
      {
        src: '/images/navigator/q-photo.png',
        alt: 'Q版照片',
        width: 150,
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
  <audio v-if="!clicked" src="/audios/take-photo.mp3" autoplay></audio>
  <back :disabled="isTiming" @click="handleBack" />
</template>

<style lang="less" scoped></style>
