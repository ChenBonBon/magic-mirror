<template>
  <div
    class="flex items-center gap-[27px] w-[243px] h-[118px] bg-full bg-no-repeat absolute top-[1670px] left-[836px]"
    :style="'background-image: url(' + confirmWrapper + ')'"
    @click="$emit('confirm')"
  >
    <img :src="confirmIcon" class="w-[53px] ml-[34px]" />
    <img :src="confirm" class="w-[96px]" />
  </div>
</template>

<script setup lang="ts">
import confirmIcon from "../assets/images/home/confirm-icon.png";
import confirmWrapper from "../assets/images/home/confirm-wrapper.png";
import confirm from "../assets/images/home/confirm.png";

defineEmits<{ confirm: [] }>();
</script>

<style lang="less" scoped></style>
