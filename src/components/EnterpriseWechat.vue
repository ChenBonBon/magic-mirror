<script setup lang="ts">
defineProps<{ qrcode: string }>();
</script>

<template>
  <div class="enterprise-wechat-wrapper">
    <img
      src="/images/enterprise-wechat/qrcode-top.png"
      alt="qrcode-top"
      class="qrcode-top"
    />
    <img :src="qrcode" alt="qrcode" class="qrcode" />
    <img
      src="/images/enterprise-wechat/qrcode-bottom.png"
      alt="enterprise-wechat-bottom"
      class="qrcode-bottom"
    />
    <img
      src="/images/enterprise-wechat/enterprise-wechat.png"
      alt="企业微信"
      class="enterprise-wechat"
    />
  </div>
</template>

<style lang="less" scoped>
.enterprise-wechat-wrapper {
  width: 171px;
  height: 212px;
  position: absolute;
  top: 387px;
  left: 836px;
  background-image: url("/images/enterprise-wechat/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .qrcode-top {
    width: 143px;
    position: absolute;
    top: 12px;
    left: 14px;
  }

  .qrcode {
    width: 105px;
    height: 105px;
    position: absolute;
    top: 33px;
    left: 34px;
  }

  .qrcode-bottom {
    width: 143px;
    position: absolute;
    top: 113px;
    left: 14px;
  }

  .enterprise-wechat {
    width: 89px;
    position: absolute;
    bottom: 12px;
    left: 41px;
  }
}
</style>
