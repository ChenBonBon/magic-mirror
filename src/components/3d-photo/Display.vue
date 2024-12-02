<script setup lang="ts">
import ThreeDModel from "../3DModel.vue";
defineProps<{
  onNext: () => void;
}>();
</script>

<template>
  <img src="/images/display/dot-2.png" alt="dot-2" class="dot-2" />
  <div class="effect-display-photo-wrapper"><three-d-model /></div>
  <div class="effect-display-wrapper">
    <img
      src="/images/display/effect-display-en.png"
      alt="EFFECT DISPLAY"
      class="effect-display-en"
    />
    <img
      src="/images/display/effect-display-cn.png"
      alt="效果展示"
      class="effect-display-cn"
    />
  </div>
  <img
    src="/images/display/display-right.png"
    alt="display-right"
    class="right"
  />
  <img src="/images/display/dot-3.png" alt="dot-3" class="dot-3" />
  <img src="/images/display/dot-4.png" alt="dot-4" class="dot-4" />
  <img
    src="/images/display/display-bottom-left.png"
    alt="display-bottom-left"
    class="bottom-left"
  />
  <div class="print-wrapper" @click="onNext">
    <img src="/images/display/print.png" alt="打印" class="print" />
  </div>
  <div class="print-wrapper" @click="onNext">
    <img src="/images/display/3d.png" alt="生成3D形象" class="threed" />
  </div>
  <img
    src="/images/display/print-tip.png"
    alt="生成最终Q版照片"
    class="print-tip"
  />
</template>

<style lang="less" scoped>
.top-left {
  width: 237px;
  position: absolute;
  top: 409px;
  left: 50px;
}
.dot-1 {
  width: 24px;
  position: absolute;
  top: 427px;
  left: 372px;
}
.star-1 {
  width: 89px;
  position: absolute;
  top: 457px;
  left: 418px;
}
.dot-2 {
  width: 25px;
  position: absolute;
  top: 444px;
  left: 617px;
}
.dot-3 {
  width: 25px;
  position: absolute;
  top: 883px;
  left: 210px;
}
.dot-4 {
  width: 40px;
  position: absolute;
  top: 1184px;
  left: 111px;
}
.dot-5 {
  width: 62px;
  position: absolute;
  top: 1274px;
  left: 161px;
}
.effect-display-photo-wrapper {
  width: 749px;
  height: 750px;
  position: absolute;
  top: 695px;
  left: 170px;
  background-image: url("/images/3d-photo/display-wrapper.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.effect-display-wrapper {
  width: 330px;
  height: 330px;
  position: absolute;
  top: 365px;
  right: 59px;
  background-image: url("/images/display/effect-display-wrapper.png");
  background-size: cover;
  background-repeat: no-repeat;
  .effect-display-en {
    position: absolute;
    top: 83px;
    left: 65px;
    width: 207px;
  }
  .effect-display-cn {
    position: absolute;
    top: 190px;
    left: 54px;
    width: 206px;
  }
}
.bottom-left {
  width: 255px;
  position: absolute;
  bottom: 235px;
  left: 48px;
}
.right {
  width: 62px;
  position: absolute;
  top: 762px;
  right: 73px;
}
.title-en {
  width: 132px;
  position: absolute;
  left: 595px;
  top: 1407px;
}
.title-cn {
  width: 144px;
  position: absolute;
  left: 442px;
  top: 1406px;
}
.print-wrapper {
  position: absolute;
  right: 0;
  bottom: 241px;
  width: 281px;
  height: 86px;
  background-image: url("/images/display/print-wrapper.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .print {
    width: 250px;
  }
  .threed {
    width: 200px;
  }
}
.print-wrapper + .print-wrapper {
  bottom: 139px;
}
.print-tip {
  position: absolute;
  left: 431px;
  bottom: 214px;
  width: 217px;
}
</style>
