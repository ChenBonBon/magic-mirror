<template>
  <div
    :style="'background-image: url(' + countdownWrapper + ')'"
    class="flex items-center px-[23px] w-[240px] h-[50px] bg-full bg-no-repeat"
  >
    <div class="flex-1 flex justify-between items-baseline">
      <img :src="countdown" alt="选择倒计时" class="w-[112px]" />
      <span class="flex-1 text-center text-white text-[30px]">{{
        remainingTime
      }}</span>
      <img :src="seconds" alt="s" class="w-[14px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { ref } from "vue";
import countdownWrapper from "../../assets/images/countdown/countdown-wrapper.png";
import countdown from "../../assets/images/countdown/countdown.png";
import seconds from "../../assets/images/countdown/seconds.png";

const emit = defineEmits<{ end: [] }>();

const remainingTime = ref(300);

const { pause } = useIntervalFn(() => {
  if (remainingTime.value <= 0) {
    pause();
    emit("end");
  } else {
    remainingTime.value -= 1;
  }
}, 1000);
</script>

<style lang="less" scoped></style>
