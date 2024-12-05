<script setup lang="ts">
import { ref } from "vue";

const activeIndex = ref(1);

function handleClick(index: number) {
  activeIndex.value = index;
}
</script>

<template>
  <div class="postures">
    <img
      v-for="i in 5"
      :key="'posture-' + i"
      :src="
        activeIndex === i
          ? '/images/3d-photo/posture-' + i + '-active.png'
          : '/images/3d-photo/posture-' + i + '.png'
      "
      :alt="'posture-' + i"
      :class="'posture-' + i"
      @click="handleClick(i)"
    />
  </div>
</template>

<style lang="less" scoped>
.postures {
  width: 670px;
  height: 188px;
  background-image: url("/images/3d-photo/posture-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 1375px;
  left: 205px;
  .posture-1,
  .posture-2,
  .posture-3,
  .posture-4 {
    position: absolute;
  }
  .posture-1 {
    width: 98px;
    top: 41px;
    left: 84px;
  }
  .posture-2 {
    width: 71px;
    top: 54px;
    left: 241px;
  }
  .posture-3 {
    width: 73px;
    top: 28px;
    right: 229px;
  }
  .posture-4 {
    width: 76px;
    top: 34px;
    right: 99px;
  }
}
</style>
