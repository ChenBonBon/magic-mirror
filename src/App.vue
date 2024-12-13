<script setup lang="ts">
import { onMounted } from "vue";
import useBackToHome from "./hooks/useBackToHome";

import { provide } from "vue";

const { start, clear, reset } = useBackToHome();

provide("startBackToHome", start);
provide("clearBackToHome", clear);
provide("resetBackToHome", reset);

onMounted(() => {
  // 阻止双击放大
  var lastTouchEnd = 0;
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener(
    "touchend",
    function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  // 阻止双指放大
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
});
</script>

<template>
  <router-view />
</template>

<style lang="less" scoped></style>
