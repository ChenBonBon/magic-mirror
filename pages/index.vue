<template>
  <div class="flex h-full w-full flex-col items-center" @click="preview">
    <img
      src="~/assets/img/index/logo.png"
      alt="欢迎使用次元魔镜"
      class="mt-(--top-logo) h-(--height-logo) w-(--width-logo)"
    />
    <img
      src="~/assets/img/index/start-btn.png"
      alt="点击屏幕开始体验"
      class="mt-(--top-index-start-btn) h-(--height-index-start-btn) w-(--width-index-start-btn)"
    />
    <img
      src="~/assets/img/index/process-tip.png"
      alt="风格选择 > 照片拍摄 > 照片打印"
      class="mt-(--top-index-process-tip) h-(--height-index-process-tip) w-(--width-index-process-tip)"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

function preview() {
  router.push("/preview");
}
</script>

<style lang="less" scoped></style>
