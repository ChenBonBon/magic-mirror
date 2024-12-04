<script setup lang="ts">
defineProps<{
  onNext: () => void;
}>();
</script>

<template>
  <div class="payment">
    <img src="/images/payment/payment.png" alt="PAYMENT" class="payment-en" />
    <img src="/images/payment/payment-cn.png" alt="支付" class="payment-cn" />
    <div class="successful-outer">
      <div class="successful-wrapper">
        <img
          src="/images/payment/payment-successful-en.png"
          alt="PAYMENT SUCCESSFUL"
          class="successful-en"
        />
        <img
          src="/images/payment/payment-successful-cn.png"
          alt="支付成功"
          class="successful-cn"
        />
      </div>
    </div>
    <img src="/images/payment/star.png" class="top-left" />
    <img src="/images/payment/star.png" class="top-right" />
    <img src="/images/payment/star.png" class="bottom-right" />
    <div class="start-wrapper">
      <img
        src="/images/payment/start.png"
        alt="开  START  始"
        class="start"
        @click="onNext"
      />
    </div>
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
  .successful-outer {
    width: 576px;
    height: 562px;
    position: absolute;
    top: 261px;
    left: 218px;
    background-image: url("/images/payment/stars.png");
    background-size: cover;
    background-repeat: no-repeat;
    .successful-wrapper {
      width: 491px;
      height: 473px;
      position: absolute;
      top: 66px;
      left: 47px;
      background-image: url("/images/payment/successful-wrapper.png");
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 22px;
      .successful-en {
        width: 320px;
      }
      .successful-cn {
        width: 310px;
      }
    }
  }
  .top-left {
    width: 50px;
    position: absolute;
    top: 299px;
    left: 268px;
  }
  .top-right {
    width: 42px;
    position: absolute;
    top: 333px;
    right: 205px;
  }
  .bottom-right {
    width: 50px;
    position: absolute;
    top: 830px;
    right: 289px;
  }
  .pending {
    width: 302px;
    position: absolute;
    bottom: 579px;
    left: 390px;
  }
  .start-wrapper {
    width: 358px;
    height: 130px;
    position: absolute;
    bottom: 509px;
    left: 331px;
    background-image: url("/images/payment/start-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .start {
      width: 266px;
    }
  }
}
</style>
