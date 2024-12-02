<script setup lang="ts">
import LayoutHeader from "../components/layout/LayoutHeader.vue";
</script>

<template>
  <main class="main">
    <layout-header />
    <slot />
  </main>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
