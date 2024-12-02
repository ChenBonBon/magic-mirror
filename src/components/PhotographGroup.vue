<script setup lang="ts">
import Photograph from "./Photograph.vue";
import PhotographConfirm from "./PhotographConfirm.vue";

defineProps<{
  onClickPhotograph: () => void;
  onClickPhotographConfirm: () => void;
}>();
</script>

<template>
  <div class="photograph-group">
    <photograph @click="onClickPhotograph" />
    <photograph-confirm @click="onClickPhotographConfirm" />
  </div>
</template>

<style lang="less" scoped>
.photograph-group {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1299px;
  right: 0;
}
</style>
