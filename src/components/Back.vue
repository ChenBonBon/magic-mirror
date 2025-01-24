<template>
  <img
    :src="back"
    alt=""
    class="absolute top-[67px] left-[61px] w-[80px]"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import back from "../assets/images/style-selection/back.png";

const emit = defineEmits<{ back: [] }>();

function handleClick() {
  emit("back");
}
</script>

<style lang="less" scoped></style>
