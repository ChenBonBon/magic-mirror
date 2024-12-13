<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import { useCountdown } from "../../hooks/useCountdown";
import { getSessionId } from "../../services/session";
import { useAppStore } from "../../useAppStore";
import { closeCamera, openCamera } from "../../utils/camera";
import Camera from "../Camera.vue";
import EnterpriseWechat from "../EnterpriseWechat.vue";
import Navigator from "../Navigator.vue";
import PhotographGroup from "../PhotographGroup.vue";

const props = defineProps<{
  onNext: () => void;
}>();

const startBackToHome = inject<() => void>("startBackToHome");
const clearBackToHome = inject<() => void>("clearBackToHome");

const cameraRef = useTemplateRef("camera");

const store = useAppStore();
const { time, isTiming, start } = useCountdown(5);

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

        startBackToHome && startBackToHome();
      }
    }
  }, 5000);

  clearBackToHome && clearBackToHome();
  start();
}

function handleClickPhotographConfirm() {
  if (store.hasPhoto) {
    props.onNext();
  }
}

onMounted(async () => {
  if (!window.localStorage.getItem("magic-mirror-sessionId")) {
    getSessionId("cute");
  }

  store.clearPhoto();
  store.clearOriginalImage();
  store.clearCuteRecords();

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
      src: '/images/navigator/q-photo-active.png',
      alt: 'Q版照片',
      width: 131,
    }"
    :inactives="[
      {
        src: '/images/navigator/ai-photo.png',
        alt: 'AI摄影',
        width: 82,
        href: '/ai-photo',
      },
      {
        src: '/images/navigator/3d-photo.png',
        alt: '3D重建',
        width: 81,
        href: '/3d-photo',
      },
    ]"
  />
  <div class="step-1-wrapper">
    <img src="/images/q-photo/step-1.png" alt="1" class="step-1" />
    <img
      src="/images/q-photo/step-1-tip.png"
      alt="第一步 按下拍照按钮 预览独属形象"
      class="step-1-tip"
    />
  </div>
  <div class="step-2-wrapper">
    <img src="/images/q-photo/step-2.png" alt="2" class="step-2" />
    <img
      src="/images/q-photo/step-2-tip.png"
      alt="第二步 确认基础形象 进入动作选择模式"
      class="step-2-tip"
    />
  </div>
  <camera ref="camera" :time="time" :is-timing="isTiming" />
  <img
    src="/images/q-photo/sub-title-arrow.png"
    alt="sub-title-arrow"
    class="sub-title-arrow"
  />
  <img
    src="/images/q-photo/sub-title.png"
    alt="人像采集 FACE CAPTURE"
    class="sub-title"
  />
  <enterprise-wechat qrcode="/images/wechat.jpg" />
  <photograph-group
    :showConfirm="store.hasPhoto"
    @click-photograph="handleClickPhotograph"
    @click-photograph-confirm="handleClickPhotographConfirm"
  />
</template>

<style lang="less" scoped>
.step-1 {
  position: absolute;
  top: 1306px;
  left: 49px;
  width: 26px;
}
.step-1-tip {
  position: absolute;
  top: 1341px;
  left: 52px;
  width: 86px;
}
.step-2 {
  position: absolute;
  top: 1192px;
  left: 932px;
  width: 26px;
}
.step-2-tip {
  position: absolute;
  top: 1226px;
  left: 934px;
  width: 115px;
}
.sub-title-arrow {
  width: 106px;
  position: absolute;
  top: 540px;
  left: 408px;
}
.sub-title {
  width: 468px;
  position: absolute;
  top: 540px;
  left: 554px;
}
</style>
