<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import Cursor from "./Cursor.vue";

const props = defineProps<{
  visible: boolean;
  onClick: () => void;
}>();

const clicked = ref(false);
const animation = ref(true);

function handleClick() {
  if (clicked.value) {
    return;
  }

  clicked.value = true;
  animation.value = false;

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
  <div class="photograph-confirm" @click="handleClick">
    <div class="check-wrapper">
      <img
        src="/images/photograph-confirm/check.png"
        alt="check"
        class="check"
      />
    </div>
    <div class="photograph-confirm-text">
      <img
        src="/images/photograph-confirm/text-en.png"
        alt="Confirm"
        class="text-en"
      />
      <img
        src="/images/photograph-confirm/text-cn.png"
        alt="确认"
        class="text-cn"
      />
    </div>
    <cursor v-show="visible && animation" class="cursor" />
  </div>
</template>

<style lang="less" scoped>
.photograph-confirm {
  display: flex;
  align-items: center;
  position: relative;
  .check-wrapper {
    position: relative;
    width: 147px;
    height: 147px;
    background-image: url("/images/photograph-confirm/check-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .check {
      width: 71px;
    }
  }
  .photograph-confirm-text {
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
  .cursor {
    top: 20%;
    left: 40%;
    width: 200px;
    height: 200px;
  }
}
</style>
