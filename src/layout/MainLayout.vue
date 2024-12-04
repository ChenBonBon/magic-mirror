<script setup lang="ts">
import LayoutHeader from "../components/layout/LayoutHeader.vue";
import Loading from "../components/Loading.vue";
import { useAppStore } from "../useAppStore";

const store = useAppStore();
</script>

<template>
  <main class="main">
    <layout-header />
    <slot />
    <Teleport to="body">
      <loading v-if="store.loading" />
    </Teleport>
  </main>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
