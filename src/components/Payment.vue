<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import VueQrcode from "vue-qrcode";
import { getPaymentStatus as getPaymentStatusApi } from "../services/order";

const props = defineProps<{
  src: string;
  width: number;
  billNo: string;
  qrcode: string;
  onPrev: () => void;
  onNext: () => void;
  onResetCountdown: () => void;
  onStartCountdown: () => void;
}>();

const startTime = new Date().getTime();
let intervalId: number;

async function getPaymentStatus() {
  if (new Date().getTime() - startTime > 60 * 1000) {
    clearInterval(intervalId);
    props.onPrev();
  }

  const res = await getPaymentStatusApi(props.billNo);

  if (res && res.status) {
    if (res.status === "success") {
      clearInterval(intervalId);
      props.onNext();
      props.onStartCountdown();
    }
  }
}

onMounted(() => {
  props.onResetCountdown();
  intervalId = setInterval(getPaymentStatus, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  props.onResetCountdown();
});
</script>

<template>
  <div class="payment">
    <img src="/images/payment/top-left.png" alt="top-left" class="top-left" />
    <img src="/images/payment/right.png" alt="right" class="right" />
    <img
      src="/images/payment/bottom-left.png"
      alt="bottom-left"
      class="bottom-left"
    />
    <img
      src="/images/payment/bottom-right.png"
      alt="bottom-right"
      class="bottom-right"
    />
    <img src="/images/payment/payment.png" alt="PAYMENT" class="payment-en" />
    <img src="/images/payment/payment-cn.png" alt="支付" class="payment-cn" />
    <div class="qrcode-wrapper">
      <img src="/images/payment/qrcode-top.png" alt="" class="qrcode-top" />
      <vue-qrcode
        :value="qrcode"
        class="qrcode"
        :color="{ dark: '#000000ff', light: '#ffffffff' }"
        type="image/png"
      />
      <img
        src="/images/payment/qrcode-bottom.png"
        alt=""
        class="qrcode-bottom"
      />
    </div>
    <img
      src="/images/payment/payment-tip.png"
      alt="支付完成 即刻体验"
      class="payment-tip"
    />
    <img :src="src" alt="title" class="title" :width="width" />
  </div>
</template>

<style lang="less" scoped>
.payment {
  width: 1020px;
  height: 1533px;
  position: absolute;
  top: 344px;
  left: 30px;
  background-image: url("/images/payment/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .top-left {
    width: 237px;
    position: absolute;
    top: 64px;
    left: 21px;
  }
  .right {
    width: 62px;
    position: absolute;
    top: 418px;
    right: 42px;
  }
  .bottom-left {
    width: 255px;
    position: absolute;
    bottom: 192px;
    left: 18px;
  }
  .bottom-right {
    width: 236px;
    position: absolute;
    bottom: 92px;
    right: 60px;
  }
  .payment-en {
    width: 245px;
    position: absolute;
    top: 123px;
    left: 389px;
  }
  .payment-cn {
    width: 99px;
    position: absolute;
    top: 183px;
    left: 460px;
  }
  .qrcode-wrapper {
    width: 198px;
    height: 198px;
    position: absolute;
    top: 435px;
    left: 409px;
    display: flex;
    justify-content: center;
    align-items: center;
    .qrcode-top {
      width: 198px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .qrcode {
      width: 145px;
    }
    .qrcode-bottom {
      width: 198px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .payment-tip {
    width: 307px;
    position: absolute;
    bottom: 640px;
    left: 358px;
  }
  .title {
    position: absolute;
    top: 917px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
