<template>
  <div class="relative">
    <img
      src="~/assets/img/preview/title.png"
      alt="次元魔镜"
      class="absolute w-(--width-preview-title) h-(--height-preview-title) top-(--top-preview-title) left-(--left-preview-title)"
    />
    <img
      src="~/assets/img/preview/left-arrow-btn.png"
      alt=""
      class="absolute w-(--width-preview-left-arrow-btn) h-(--height-preview-left-arrow-btn) top-(--top-preview-left-arrow-btn) left-(--left-preview-left-arrow-btn)"
    />
    <img
      src="~/assets/img/preview/right-arrow-btn.png"
      alt=""
      class="absolute w-(--width-preview-right-arrow-btn) h-(--height-preview-right-arrow-btn) top-(--top-preview-right-arrow-btn) left-(--left-preview-right-arrow-btn)"
    />
    <NuxtLink to="/">
      <img
        src="~/assets/img/preview/back-btn.png"
        alt=""
        class="absolute w-(--width-preview-back-btn) h-(--height-preview-back-btn) top-(--top-preview-back-btn) left-(--left-preview-back-btn)"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped></style>
