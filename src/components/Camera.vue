<template>
  <div
    class="absolute top-[318px] left-[100px] w-[880px] h-[880px] bg-full bg-no-repeat rounded-full"
    :style="'background-image: url(' + cameraWrapper + ')'"
  >
    <video
      ref="video"
      width="880"
      height="880"
      class="rounded-full -scale-x-100"
      v-show="!photo"
    ></video>
    <canvas
      v-show="photo"
      ref="canvas"
      class="rounded-full"
      width="880"
      height="880"
    ></canvas>
    <div
      v-show="isActive && remainingTime > 0"
      class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-[154px]"
    >
      {{ remainingTime }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import cameraWrapper from "../assets/images/camera/camera-wrapper.png";
import useCamera from "../hooks/useCamera";

const props = defineProps<{
  countdown?: number;
}>();

const emit = defineEmits<{
  open: [cameraId: ConstrainDOMString];
  change: [photo: Blob];
}>();

const { getCameraList, openCamera, closeCamera } = useCamera();

const video = useTemplateRef("video");
const canvas = useTemplateRef("canvas");

const cameraList = ref<MediaDeviceInfo[]>([]);
const photo = ref();
const photoBlob = ref();
const stream = ref();
const timer = ref(props.countdown || 5000);

const remainingTime = computed(() => {
  return Math.floor(timer.value / 1000);
});

const { pause, resume, isActive } = useIntervalFn(
  () => {
    if (timer.value <= 0) {
      pause();
    } else {
      timer.value -= 1000;
    }
  },
  1000,
  {
    immediate: false,
  }
);

defineExpose({
  video,
  canvas,
  takingPhoto: isActive,
  openCamera: open,
  takePhoto,
  reTakePhoto,
});

function takePhoto() {
  startCountdown();

  setTimeout(() => {
    if (canvas.value) {
      const context = canvas.value.getContext("2d");
      if (context && video.value) {
        context.translate(video.value.width, 0);
        context.scale(-1, 1);
        context.drawImage(
          video.value,
          0,
          0,
          video.value.width,
          video.value.height
        );
        const data = canvas.value.toDataURL("image/png");
        photo.value = data;

        canvas.value.toBlob((blob) => {
          if (blob) {
            photoBlob.value = blob;
            emit("change", blob);
          }
        });
      }
    }
  }, props.countdown || 5000);
}

function reTakePhoto() {
  if (photo.value) {
    photo.value = undefined;
    if (video.value && canvas.value) {
      const context = canvas.value.getContext("2d");
      if (context) {
        context.translate(video.value.width, 0);
        context.scale(-1, 1);
        context.clearRect(0, 0, canvas.value.width, canvas.value.height);
      }
    }
  }

  takePhoto();
}

function startCountdown() {
  timer.value = props.countdown || 5000;

  resume();
}

async function open(cameraId: ConstrainDOMString) {
  if (video.value) {
    stream.value = await openCamera(cameraId, video.value, 880, 880);
  }
}

onMounted(async () => {
  cameraList.value = await getCameraList();

  if (video.value && cameraList.value.length > 0) {
    const cameraId = cameraList.value[0].deviceId;
    emit("open", cameraId);
    await open(cameraId);
  }
});

onBeforeUnmount(() => {
  if (stream.value) {
    closeCamera(stream.value);
  }
});
</script>

<style lang="less" scoped></style>
