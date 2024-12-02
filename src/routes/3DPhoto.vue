<script setup lang="ts">
import { ref } from "vue";
import Display from "../components/3d-photo/Display.vue";
import Home from "../components/3d-photo/Home.vue";
import Preview from "../components/3d-photo/Preview.vue";
import PageFooter from "../components/PageFooter.vue";
import Pagination from "../components/Pagination.vue";
import Payment from "../components/Payment.vue";
import MainLayout from "../layout/MainLayout.vue";

const step = ref(1);

function handleNext() {
  step.value += 1;
}

function handleBack(newStep: number) {
  step.value = newStep;
}
</script>

<template>
  <main-layout>
    <div class="three-d-photo">
      <home v-if="step === 1" @next="handleNext" />
      <preview
        v-else-if="step === 2"
        title="/images/3d-photo/title.png"
        @next="handleNext"
      >
        <template #preview-tip>
          <img
            src="/images/3d-photo/preview-tip.png"
            alt="3D模型生成  3D MODEL"
            class="preview-tip"
          />
        </template>
        <template #generate-tip>
          <img
            src="/images/3d-photo/generate-tip.png"
            alt="生成最终3D模型"
            class="generate-tip"
          />
        </template>
      </preview>
      <display v-else-if="step === 3" @next="handleNext" />
      <payment
        v-else-if="step === 4"
        src="/images/payment/3d-photo.png"
        :width="347"
        qrcode=""
      />
      <page-footer v-show="step === 1" />
      <pagination :step="step" :total="3" @click="handleBack" />
    </div>
  </main-layout>
</template>

<style lang="less" scoped>
.three-d-photo {
  width: 100%;
  height: 100%;
  background-image: url("/images/3d-photo/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .preview-tip {
    position: absolute;
    top: 361px;
    right: 170px;
    width: 339px;
  }
  .generate-tip {
    position: absolute;
    bottom: 214px;
    left: 432px;
    width: 217px;
  }
}
</style>
