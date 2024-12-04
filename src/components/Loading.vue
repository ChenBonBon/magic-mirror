<script setup lang="ts">
import { useFadeProgressPercent } from "../hooks/useFadeProgressPercent";

const DURATION = 60 * 1000;

const { percent } = useFadeProgressPercent(DURATION);

function handleClick() {
  return false;
}
</script>

<template>
  <div class="loading-wrapper" @click="handleClick">
    <div class="loading"></div>
    <div>{{ percent }}%</div>
  </div>
</template>

<style lang="less" scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  font-size: 64px;
  color: #ffffff;
  .loading {
    width: 100px;
    height: 100px;
    border: 10px solid #fff;
    border-top-color: transparent;
    border-radius: 100%;
    animation: circle-7fb57159 infinite 1.5s linear;
  }
}
// 转转转动画
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
