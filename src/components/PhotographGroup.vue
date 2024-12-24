<script setup lang="ts">
import Photograph from "./Photograph.vue";
import PhotographConfirm from "./PhotographConfirm.vue";

defineProps<{
  showConfirm: boolean;
  onClickPhotograph: () => void;
  onClickPhotographConfirm: () => void;
}>();
</script>

<template>
  <div class="photograph-group">
    <photograph @click="onClickPhotograph" />
    <photograph-confirm
      @click="onClickPhotographConfirm"
      class="photograph-confirm"
      :visible="showConfirm"
      :style="{ transform: showConfirm ? 'translateX(0)' : 'translateX(100%)' }"
    />
  </div>
</template>

<style lang="less" scoped>
.photograph-group {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1299px;
  right: 0;
  .photograph-confirm {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
}
</style>
