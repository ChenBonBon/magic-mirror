<script setup lang="ts">
import { useFadeProgressPercent } from "../hooks/useFadeProgressPercent";

const DURATION = 60 * 1000;

const { percent } = useFadeProgressPercent(DURATION);
</script>

<template>
  <div class="loading">
    <div class="loading-bar-wrapper">
      <slot name="loading-bar"></slot>
    </div>
    <div class="percent">{{ percent }}%</div>
  </div>
</template>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  .loading-bar-wrapper {
    width: 100%;
    height: 100%;
    animation: circle infinite 1.5s linear;
    background-image: url("/images/loading/loading-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .percent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: monospace;
    font-size: 64px;
    font-weight: 600;
    color: #000000;
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
