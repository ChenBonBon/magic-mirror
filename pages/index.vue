<template>
  <NuxtLink to="/preview" class="block w-full h-full">
    <div class="flex flex-col items-center">
      <img
        src="~/assets/img/index/logo.png"
        alt="欢迎使用次元魔镜"
        class="w-(--width-logo) h-(--height-logo) mt-(--top-logo)"
      />
      <img
        src="~/assets/img/index/start-btn.png"
        alt="点击屏幕开始体验"
        class="w-(--width-index-start-btn) h-(--height-index-start-btn) mt-(--top-index-start-btn)"
      />
      <img
        src="~/assets/img/index/process-tip.png"
        alt="风格选择 > 照片拍摄 > 照片打印"
        class="w-(--width-index-process-tip) h-(--height-index-process-tip) mt-(--top-index-process-tip)"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped></style>
