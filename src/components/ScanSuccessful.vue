<script setup lang="ts"></script>

<template>
  <div class="payment">
    <img src="/images/payment/payment.png" alt="PAYMENT" class="payment-en" />
    <img src="/images/payment/payment-cn.png" alt="支付" class="payment-cn" />
    <div class="successful-outer">
      <div class="successful-wrapper">
        <img
          src="/images/payment/scan-successful-en.png"
          alt="SCAN SUCCESSFUL"
          class="successful-en"
        />
        <img
          src="/images/payment/scan-successful-cn.png"
          alt="扫码成功"
          class="successful-cn"
        />
      </div>
    </div>
    <img src="/images/payment/star.png" class="top-left" />
    <img src="/images/payment/star.png" class="top-right" />
    <img src="/images/payment/star.png" class="bottom-right" />
    <img src="/images/payment/pending.png" class="pending" />
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
}
</style>
