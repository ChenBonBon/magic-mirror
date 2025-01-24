<template>
  <div
    class="w-full h-full bg-full bg-no-repeat"
    :style="'background-image: url(' + bg + ')'"
  >
    <router-view />
  </div>
</template>

<script setup lang="ts">
import bg from "../assets/images/bg.png";
</script>

<style lang="less" scoped></style>
