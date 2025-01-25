<template>
  <div class="relative w-full h-full">
    <img
      :src="title"
      alt="欢迎使用次元魔镜"
      class="absolute top-[132px] left-[14px] w-[1062px]"
    />
    <img :src="a" alt="A" class="absolute w-[63px] top-[574px] left-[509px]" />
    <img
      :src="tipA"
      alt="扫码获取电子相片"
      class="absolute top-[670px] left-[359px] w-[368px]"
    />
    <vue-qrcode
      :value="qrcode"
      class="absolute top-[751px] left-[346px] w-[387px] rounded-[24px]"
      :color="{ dark: '#000000ff', light: '#ffffffff' }"
      type="image/png"
    />
    <img :src="b" alt="B" class="absolute w-[63px] top-[1231px] left-[509px]" />
    <img
      :src="tipB"
      alt="纸质版打印中"
      class="absolute w-[287px] top-[1330px] left-[396px]"
    />
    <van-progress
      :percentage="percent"
      stroke-width="24"
      color="#bdd8df"
      class="absolute top-[1440px] left-[297px] w-[485px]"
    />
    <div
      :style="'background-image: url(' + backWrapper + ')'"
      class="bg-full bg-no-repeat absolute top-[1567px] left-[409px] w-[274px] h-[274px]"
    >
      <img
        :src="back"
        alt="返回首页"
        class="w-[150px] mt-[45px] ml-[59px]"
        @click="handleBack"
      />
    </div>
    <audio src="/audios/print.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import VueQrcode from "vue-qrcode";
import { useRouter } from "vue-router";
import a from "../assets/images/print/a.png";
import b from "../assets/images/print/b.png";
import backWrapper from "../assets/images/print/back-wrapper.png";
import back from "../assets/images/print/back.png";
import tipA from "../assets/images/print/tip-a.png";
import tipB from "../assets/images/print/tip-b.png";
import title from "../assets/images/standby/title.png";

const router = useRouter();

const alpha = 5;
const duration = 30;

const qrcode = ref(
  "http://www.hfotion.cn:3577/preview?sessionId=" +
    window.localStorage.getItem("magic-mirror-session")
);
const time = ref(duration);

const { resume, pause, isActive } = useIntervalFn(
  () => {
    if (time.value <= 0) {
      pause();
    } else {
      time.value -= 1;
    }
  },
  1000,
  {
    immediate: false,
  }
);

const percent = computed(() => {
  return Math.floor(
    (1 - Math.exp((-alpha * (duration - time.value)) / duration)) * 100
  );
});

watch(isActive, (newVal, oldVal) => {
  if (oldVal && !newVal) {
    handleBack();
  }
});

async function print() {
  const res = await axios.get("/print/api/v1/image-print");

  if (res) {
    resume();
  }
}

function handleBack() {
  router.push("/");
}

onMounted(() => {
  print();
});
</script>

<style lang="less" scoped></style>
