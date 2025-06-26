<template>
  <div
    class="relative flex h-full w-full flex-col items-center"
    @click="selectMode"
  >
    <img
      src="~/assets/img/preview/title.png"
      alt="次元魔镜"
      class="mt-(--top-preview-title) h-(--height-preview-title) w-(--width-preview-title)"
    />
    <img
      src="~/assets/img/preview/left-arrow-btn.png"
      alt=""
      class="absolute top-(--top-preview-left-arrow-btn) left-(--left-preview-left-arrow-btn) h-(--height-preview-left-arrow-btn) w-(--width-preview-left-arrow-btn)"
    />
    <img
      src="~/assets/img/preview/right-arrow-btn.png"
      alt=""
      class="absolute top-(--top-preview-right-arrow-btn) left-(--left-preview-right-arrow-btn) h-(--height-preview-right-arrow-btn) w-(--width-preview-right-arrow-btn)"
    />
    <img
      src="~/assets/img/preview/back-btn.png"
      alt=""
      class="absolute top-(--top-preview-back-btn) left-(--left-preview-back-btn) h-(--height-preview-back-btn) w-(--width-preview-back-btn)"
      @click="back"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

function selectMode() {
  router.push("/mode-selection");
}

function back() {
  router.push("/");
}
</script>

<style lang="less" scoped></style>
