<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const props = defineProps<{
  onClick: () => void;
}>();

const clicked = ref(false);

function handleClick() {
  if (clicked.value) {
    return;
  }

  clicked.value = true;
  props.onClick();

  setTimeout(() => {
    clicked.value = false;
  }, 1000);
}

onBeforeUnmount(() => {
  clicked.value = false;
});
</script>

<template>
  <div
    :class="['photograph', clicked ? '' : 'not-clicked']"
    @click="handleClick"
  >
    <div class="camera-wrapper">
      <img src="/images/photograph/camera.png" alt="camera" class="camera" />
    </div>
    <div class="photograph-text">
      <img
        src="/images/photograph/text-en.png"
        alt="Take photos"
        class="text-en"
      />
      <img src="/images/photograph/text-cn.png" alt="拍照" class="text-cn" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.photograph {
  display: flex;
  align-items: center;
  &.not-clicked {
    animation: resize 1s linear infinite;
  }
  .camera-wrapper {
    position: relative;
    width: 147px;
    height: 147px;
    background-image: url("/images/photograph/camera-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .camera {
      width: 71px;
    }
  }
  .photograph-text {
    width: 141px;
    height: 99px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    background-color: #14def9;
    padding-left: 40px;
    margin-left: -25px;
    .text-en {
      width: 96px;
    }
    .text-cn {
      width: 52px;
    }
  }
}

@keyframes resize {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
