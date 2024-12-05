<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  disabled: boolean;
  onClick: (index: number) => void;
}>();

const activeIndex = ref(1);

function handleClick(index: number) {
  if (props.disabled) {
    return;
  }

  activeIndex.value = index;

  props.onClick(index);
}
</script>

<template>
  <div class="postures">
    <img
      v-for="i in 5"
      :key="'posture-' + i"
      :src="
        activeIndex === i
          ? '/images/q-photo/posture-' + i + '-active.png'
          : '/images/q-photo/posture-' + i + '.png'
      "
      :alt="'posture-' + i"
      :class="'posture-' + i"
      @click="handleClick(i)"
    />
  </div>
</template>

<style lang="less" scoped>
.postures {
  width: 816px;
  height: 188px;
  background-image: url("/images/q-photo/posture-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 1375px;
  left: 132px;
  .posture-1,
  .posture-2,
  .posture-3,
  .posture-4,
  .posture-5,
  .posture-6 {
    position: absolute;
  }
  .posture-1 {
    width: 66px;
    top: 25px;
    left: 83px;
  }
  .posture-2 {
    width: 89px;
    top: 46px;
    left: 181px;
  }
  .posture-3 {
    width: 71px;
    top: 54px;
    left: 317px;
  }
  .posture-4 {
    width: 61px;
    top: 25px;
    right: 315px;
  }
  .posture-5 {
    width: 76px;
    top: 34px;
    right: 197px;
  }
  .posture-6 {
    width: 67px;
    top: 50px;
    right: 79px;
  }
}
</style>
