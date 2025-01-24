<template>
  <div class="relative w-full h-full">
    <back @back="handleBack" />
    <img
      :src="title"
      alt="欢迎使用次元魔镜"
      class="absolute w-[1062px] top-[132px] left-[14px]"
    />
    <div
      class="absolute bg-full bg-no-repeat top-[600px] left-[108px] w-[877px] h-[1140px]"
      :style="'background-image: url(' + stepWrapper + ')'"
    >
      <img :src="tip" alt="相片生成中" class="w-[265px] mt-[95px] ml-[318px]" />
      <div class="flex flex-col gap-[79px] mt-[80px] ml-[152px] mr-[129px]">
        <div
          v-for="(item, index) in stepList"
          :key="index"
          class="flex justify-between items-center h-[53px]"
        >
          <img :src="item" alt="" class="w-[182px]" />
          <check :checked="index < currentStep" class="w-[54px]" />
          <van-loading
            v-show="index === currentStep"
            type="spinner"
            color="#1989fa"
            size="53px"
          />
        </div>
      </div>
    </div>
    <audio src="/audios/generating.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import step1 from "../assets/images/generating/step-1.png";
import step2 from "../assets/images/generating/step-2.png";
import step3 from "../assets/images/generating/step-3.png";
import step4 from "../assets/images/generating/step-4.png";
import step5 from "../assets/images/generating/step-5.png";
import stepWrapper from "../assets/images/generating/step-wrapper.png";
import tip from "../assets/images/generating/tip.png";
import title from "../assets/images/standby/title.png";
import Back from "../components/Back.vue";
import Check from "../components/Check.vue";
import { generate, getGenerateStatus } from "../services/image";
import { useStore } from "../store";

const stepList = [step1, step2, step3, step4, step5];

const currentStep = ref(0);
const remainingTime = ref(120);
const count = ref(0);

const $toast = useToast();
const router = useRouter();
const route = useRoute();
const store = useStore();

const { pause } = useIntervalFn(async () => {
  count.value += 1;

  if (remainingTime.value <= 0) {
    pause();

    $toast.error("生成超时");
    handleBack();
  } else {
    remainingTime.value -= 5;

    const res = await getGenerateStatus();

    if (res) {
      if (res.data.status === "pending") {
        remainingTime.value = 120;

        if (count.value < 1) {
          currentStep.value = 1;
        } else if (count.value < 3) {
          currentStep.value = 2;
        } else if (count.value < 6) {
          currentStep.value = 3;
        } else {
          currentStep.value = 4;
        }
      } else if (res.data.status === "success") {
        if (currentStep.value < 4) {
          currentStep.value = 4;
        }

        setTimeout(() => {
          currentStep.value = 5;
        }, 1000);
      }
    }
  }
}, 5000);

watch(currentStep, (val) => {
  if (val === 5) {
    router.push({ path: "/choose-photos", query: route.query });
  }
});

function handleBack() {
  router.push({
    path: route.query.from as string,
    query: {
      styleId: route.query.styleId,
    },
  });
}

onMounted(() => {
  if (store.photo && route.query.styleId) {
    generate(store.photo, route.query.styleId as string);
  }
});
</script>

<style lang="less" scoped></style>
