<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="title-wrapper">
    <img :src="title" alt="title" class="title" />
  </div>
  <div class="preview">
    <img src="" alt="" />
  </div>
  <slot name="preview-tip" />
  <div class="step-4-wrapper">
    <img src="/images/q-photo/step-4.png" alt="4" class="step-4" />
    <img
      src="/images/q-photo/step-4-tip.png"
      alt="第四步 预览历史生成形象 选择你喜欢的动作"
      class="step-4-tip"
    />
  </div>
  <div class="records">
    <img src="/images/q-photo/record.png" alt="first" class="first-record" />
    <img src="/images/q-photo/record.png" alt="second" class="second-record" />
    <img src="/images/q-photo/record.png" alt="third" class="third-record" />
  </div>
  <slot name="postures" />
  <div class="generate-wrapper">
    <img src="/images/q-photo/generate.png" alt="生成" class="generate" />
  </div>
  <slot name="generate-tip" />
</template>

<style lang="less" scoped>
.title-wrapper {
  position: absolute;
  top: 379px;
  left: 204px;
  width: 153px;
  height: 153px;
  background-image: url("/images/q-photo/title-wrapper.png");
  background-size: cover;
  background-repeat: no-repeat;
  .title {
    width: 86px;
    height: 86px;
    position: absolute;
    top: 30px;
    left: 37px;
  }
}
.preview {
  position: absolute;
  top: 412px;
  left: 220px;
  width: 640px;
  height: 640px;
  background-image: url("/images/q-photo/preview.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.step-4-wrapper {
  position: absolute;
  top: 396px;
  left: 872px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  .step-4 {
    width: 26px;
  }
  .step-4-tip {
    width: 115px;
    margin-left: 3px;
  }
}
.records {
  .first-record,
  .second-record,
  .third-record {
    position: absolute;
    width: 240px;
    height: 240px;
  }
  .first-record {
    top: 990px;
    left: 122px;
  }
  .second-record {
    top: 1080px;
    left: 428px;
  }
  .third-record {
    top: 981px;
    right: 106px;
  }
}
.generate-wrapper {
  position: absolute;
  left: 359px;
  top: 1609px;
  width: 363px;
  height: 57px;
  background-image: url("/images/q-photo/generate-wrapper.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .generate {
    width: 279px;
  }
}
</style>
