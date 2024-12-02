<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function navigateToHome() {
  router.push("/");
}
</script>

<template>
  <div class="layout-header" @click="navigateToHome">
    <div class="title-wrapper">
      <img src="/images/layout/title.png" alt="次元魔镜" class="title" />
      <img
        src="/images/layout/title-bg.png"
        alt="logo-wrapper"
        class="title-bg"
      />
    </div>
    <img src="/images/logo.png" alt="Logo" class="logo" />
  </div>
</template>

<style lang="less" scoped>
.layout-header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .title-wrapper {
    position: absolute;
    top: 71px;
    left: 69px;
    .title {
      width: 400px;
    }
    .title-bg {
      width: 430px;
      position: absolute;
      bottom: 3px;
      right: -205px;
    }
  }
  .logo {
    width: 330px;
    position: absolute;
    top: 42px;
    right: 55px;
  }
}
</style>
