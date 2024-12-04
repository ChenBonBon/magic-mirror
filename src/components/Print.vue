<script setup lang="ts">
import { useFadeProgressPercent } from "../hooks/useFadeProgressPercent";
const DURATION = 10 * 1000;

const { percent } = useFadeProgressPercent(DURATION);
</script>

<template>
  <div class="print">
    <img
      src="/images/print/printing-en.png"
      alt="PRINTING IN PROGRESS"
      class="printing-en"
    />
    <img
      src="/images/print/printing-cn.png"
      alt="打印中 ······"
      class="printing-cn"
    />
    <div class="loading-wrapper">
      <div class="loading"></div>
      <div class="percent">
        {{ percent }}<span style="margin-left: 8px">%</span>
      </div>
    </div>
    <img src="/images/wechat.jpg" alt="qrcode" class="qrcode" />
  </div>
</template>

<style lang="less" scoped>
.print {
  width: 1020px;
  height: 1533px;
  position: absolute;
  top: 344px;
  left: 30px;
  background-image: url("/images/print/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .printing-en {
    width: 329px;
    position: absolute;
    top: 169px;
    left: 346px;
  }
  .printing-cn {
    width: 175px;
    position: absolute;
    top: 297px;
    left: 420px;
  }
  .loading-wrapper {
    width: 382px;
    height: 382px;
    position: absolute;
    top: 465px;
    left: 308px;
    .loading {
      width: 340px;
      height: 340px;
      border: 20px solid #000;
      border-top-color: transparent;
      border-radius: 100%;
      animation: circle-7fb57159 infinite 1.5s linear;
    }
    .percent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 64px;
      font-family: monospace;
    }
  }
  .qrcode {
    width: 186px;
    position: absolute;
    top: 1019px;
    left: 416px;
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
