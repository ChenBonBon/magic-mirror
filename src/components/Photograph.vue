<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import Cursor from "./Cursor.vue";

const props = defineProps<{
  onClick: () => void;
}>();

const canClick = ref(true);
const clicked = ref(false);
const animation = ref(true);

function handleClick() {
  if (!canClick.value) {
    return;
  }

  canClick.value = false;
  clicked.value = true;
  animation.value = false;
  props.onClick();

  setTimeout(() => {
    canClick.value = true;
  }, 1000);
}

onBeforeUnmount(() => {
  canClick.value = true;
});
</script>

<template>
  <div class="photograph" @click="handleClick">
    <div class="camera-wrapper">
      <img src="/images/photograph/camera.png" alt="camera" class="camera" />
    </div>
    <div class="photograph-text">
      <img
        :src="
          clicked
            ? '/images/photograph/again.png'
            : '/images/photograph/text-en.png'
        "
        alt="Take photos"
        class="text-en"
      />
      <img
        v-if="clicked"
        src="/images/photograph/again-cn.png"
        alt="拍照"
        class="again-cn"
      />
      <img
        v-else
        src="/images/photograph/text-cn.png"
        alt="拍照"
        class="text-cn"
      />
    </div>
    <cursor v-show="animation" class="cursor" />
  </div>
</template>

<style lang="less" scoped>
.photograph {
  display: flex;
  align-items: center;
  position: relative;
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
    .again-cn {
      width: 120px;
    }
    .text-cn {
      width: 52px;
    }
  }
  .cursor {
    top: 20%;
    left: 40%;
    width: 200px;
    height: 200px;
  }
}
</style>
