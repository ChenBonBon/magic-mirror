<template>
  <div
    class="flex flex-col items-center absolute top-[1790px] left-[410px] w-[266px]"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
  >
    <img :src="privacy" alt="隐私与免责温馨提示" class="w-[266px]" />
    <img :src="privacyArrow" alt="" class="w-[53px] mt-[1px]" />
  </div>
  <van-action-sheet v-model:show="privacyVisible" title="隐私与免责温馨提示">
    <div class="content">{{ privacyContent }}</div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import privacyArrow from "../assets/images/home/privacy-arrow.png";
import privacy from "../assets/images/home/privacy.png";

// TODO: 需要提供隐私与免责条款
const privacyContent = ref("隐私与免责温馨提示");
const privacyVisible = ref(false);
const touchStartX = ref(0);
const touchStartY = ref(0);

function handleTouchStart(event: TouchEvent) {
  touchStartX.value = event.touches[0].pageX;
  touchStartY.value = event.touches[0].pageY;
}

function handleTouchMove(event: TouchEvent) {
  const threshold = 10; // 设置阈值为10px

  const touchMoveX = event.touches[0].pageX - touchStartX.value;
  const touchMoveY = event.touches[0].pageY - touchStartY.value;

  if (Math.abs(touchMoveX) < threshold && Math.abs(touchMoveY) < threshold) {
    return; // 如果移动距离小于阈值，则忽略
  }

  if (Math.abs(touchMoveX) > Math.abs(touchMoveY)) {
    // 水平移动忽略
    return;
  } else {
    // 垂直移动
    if (touchMoveY > 0) {
      // 向下移动忽略
      return;
    } else {
      // 向上移动
      privacyVisible.value = true;
    }
  }
}
</script>

<style lang="less" scoped></style>
