<template>
  <img :src="src" alt="" class="" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import check from "../assets/images/check/check.png";
import defaultIcon from "../assets/images/check/default.png";

const props = defineProps<{ checked: boolean; showDefault?: boolean }>();

const src = computed(() => {
  if (props.showDefault) {
    return props.checked ? check : defaultIcon;
  }

  return props.checked ? check : "";
});
</script>

<style lang="less" scoped></style>
