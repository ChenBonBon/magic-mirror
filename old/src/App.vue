<template>
  <van-config-provider
    :theme-vars="{
      swipeIndicatorSize: '16px',
    }"
    class="w-full h-full"
  >
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
import { useTouch } from "./hooks/useTouch";

useTouch();
</script>

<style scoped></style>
