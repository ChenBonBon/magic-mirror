<template>
  <div class="relative w-full h-full">
    <back @back="handleBack" />
    <img
      :src="title"
      alt="欢迎使用次元魔镜"
      class="absolute top-[132px] left-[14px] w-[1062px]"
    />
    <div
      :style="'background-image: url(' + total + ')'"
      class="bg-full bg-no-repeat absolute top-[586px] left-[342px] w-[426px] h-[77px] text-black"
    >
      <div
        class="absolute w-[95px] h-full flex justify-center items-start left-[52px] -top-[16px] text-[56px] text-center"
      >
        {{ store.count }}
      </div>
      <div
        class="absolute w-[150px] h-full flex justify-center items-start left-[210px] -top-[50px] text-[96px] text-center"
      >
        {{ price / 100 }}
      </div>
    </div>
    <img :src="tip1" class="absolute top-[735px] left-[424px] w-[232px]" />
    <img :src="tip2" class="absolute top-[824px] left-[447px] w-[184px]" />
    <vue-qrcode
      :value="qrcode"
      class="absolute top-[1036px] left-[355px] w-[370px] rounded-[24px]"
      :color="{ dark: '#000000ff', light: '#ffffffff' }"
      type="image/png"
    />
    <img :src="payTip" class="absolute top-[1480px] left-[358px] w-[364px]" />
    <audio src="/audios/payment.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { onMounted, ref } from "vue";
import VueQrcode from "vue-qrcode";
import { useRoute, useRouter } from "vue-router";
import payTip from "../assets/images/payment/pay-tip.png";
import tip1 from "../assets/images/payment/tip-1.png";
import tip2 from "../assets/images/payment/tip-2.png";
import total from "../assets/images/payment/total.png";
import title from "../assets/images/standby/title.png";
import Back from "../components/Back.vue";
import { getPaymentStatus, getPaymentUrl } from "../services/payment";
import { useStore } from "../store";

const price = ref(0);
const qrcode = ref("");
const billNo = ref("");
const timer = ref(60);

const router = useRouter();
const route = useRoute();
const store = useStore();

const { resume, pause } = useIntervalFn(
  async () => {
    if (timer.value <= 0) {
      pause();

      handleBack();
    } else {
      if (billNo.value.length > 0) {
        const res = await getPaymentStatus(billNo.value);

        if (res) {
          if (res.data.status === "success") {
            router.push("/print");
          }
        }
      }
      timer.value -= 1;
    }
  },
  1000,
  { immediate: false }
);

async function init() {
  const res = await getPaymentUrl();

  if (res) {
    qrcode.value = res.data.QRCode;
    price.value = res.data.totalPrice;
    billNo.value = res.data.billNo;

    resume();
  }
}

function handleBack() {
  router.push({ path: "/cart", query: route.query });
}

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped></style>
