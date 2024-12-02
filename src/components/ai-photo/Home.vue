<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
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

const stream = ref();

async function handleClickPhotograph() {
  if (store.photo.length > 0) {
    store.clearPhoto();
    if (cameraRef.value && cameraRef.value.video) {
      stream.value = await openCamera(cameraRef.value.video);
    }

    return;
  }

  if (cameraRef.value && cameraRef.value.canvas) {
    const context = cameraRef.value.canvas.getContext("2d");
    if (context && cameraRef.value.video) {
      context.drawImage(
        cameraRef.value.video,
        0,
        0,
        cameraRef.value.video.width,
        cameraRef.value.video.height
      );
      const data = cameraRef.value.canvas.toDataURL("image/png");
      store.setPhoto(data);
    }
  }
}

function handleClickPhotographConfirm() {
  props.onNext();
}

onMounted(async () => {
  getSessionId("aiPhoto");
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
  <camera ref="camera" />
  <photograph-group
    @click-photograph="handleClickPhotograph"
    @click-photograph-confirm="handleClickPhotographConfirm"
  />
</template>

<style lang="less" scoped></style>
