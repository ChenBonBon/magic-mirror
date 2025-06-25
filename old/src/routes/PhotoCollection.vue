<template>
  <div class="relative w-full h-full">
    <back @back="handleBack" />
    <img
      :src="lookTip"
      alt="请看镜头"
      class="absolute top-[35px] left-[394px] w-[292px]"
    />
    <img
      :src="title"
      alt="拍照采集"
      class="absolute top-[117px] left-[298px] w-[493px]"
    />
    <camera ref="camera" @open="handleOpen" @change="handleChange" />
    <img
      :src="tip"
      alt="请保持脸部在拍照框内"
      class="absolute top-[1222px] left-[394px] w-[298px]"
    />
    <img
      v-show="photo"
      :src="retakePhotos"
      alt="重拍"
      class="absolute top-[1456px] left-[391px] w-[310px]"
      @click="handleReTakePhoto"
    />
    <img
      v-show="!photo"
      :src="takePhotos"
      alt="拍摄"
      class="absolute top-[1456px] left-[391px] w-[310px]"
      @click="handleTakePhoto"
    />
    <confirm v-show="photo" @confirm="handleConfirm" />
    <audio src="/audios/photo-collection.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import lookTip from "../assets/images/photo-collection/look-tip.png";
import retakePhotos from "../assets/images/photo-collection/retake-photos.png";
import takePhotos from "../assets/images/photo-collection/take-photos.png";
import tip from "../assets/images/photo-collection/tip.png";
import title from "../assets/images/photo-collection/title.png";
import Back from "../components/Back.vue";
import Camera from "../components/Camera.vue";
import Confirm from "../components/Confirm.vue";
import { getSessionId } from "../services/session";
import { useStore } from "../store";

const cameraRef = useTemplateRef("camera");

const activeCameraId = ref<ConstrainDOMString>("");
const photo = ref<Blob>();

const router = useRouter();
const route = useRoute();
const store = useStore();

const takingPhoto = computed(() => {
  if (cameraRef && cameraRef.value) {
    return cameraRef.value.takingPhoto;
  }

  return false;
});

function handleOpen(cameraId: ConstrainDOMString) {
  activeCameraId.value = cameraId;
}

function handleChange(data: Blob) {
  photo.value = data;
}

function handleTakePhoto() {
  // 如果正在拍照，不做任何操作
  if (takingPhoto.value) {
    return;
  }

  if (cameraRef.value) {
    cameraRef.value.takePhoto();
  }
}

async function handleConfirm() {
  // 如果正在拍照，不做任何操作
  if (takingPhoto.value) {
    return;
  }

  if (photo.value) {
    store.setPhoto(photo.value);
    const res = await getSessionId();

    if (res) {
      window.localStorage.setItem("magic-mirror-session", res.data.sessionId);

      if (route.query.styleId) {
        router.push({
          path: "/generating",
          query: { ...route.query, from: route.path },
        });
      }
    }
  }
}

function handleReTakePhoto() {
  // 如果正在拍照，不做任何操作
  if (takingPhoto.value) {
    return;
  }

  if (cameraRef.value) {
    cameraRef.value.reTakePhoto();
  }
}

function handleBack() {
  // 如果正在拍照，不做任何操作
  if (takingPhoto.value) {
    return;
  }

  router.push({ path: "/collection-methods", query: route.query });
}
</script>

<style lang="less" scoped></style>
