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
      :src="'/images/q-photo/posture-' + i + '.png'"
      :alt="'posture-' + i"
      :class="['posture', activeIndex === i ? 'active' : '']"
      @click="handleClick(i)"
    />
  </div>
</template>

<style lang="less" scoped>
.postures {
  width: 688px;
  height: 188px;
  background-image: url(/images/q-photo/posture-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 1375px;
  left: 132px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 64px;
  .posture {
    border: 10px solid transparent;
    height: 112px;
    &.active {
      border-color: #ffffff;
    }
  }
}
</style>
