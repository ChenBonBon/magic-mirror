<script setup lang="ts">
import { ref } from "vue";
import Home from "../components/ai-photo/Home.vue";
import Postures from "../components/ai-photo/Postures.vue";
import Preview from "../components/ai-photo/Preview.vue";
import Display from "../components/Display.vue";
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
    <div class="ai-photo">
      <home v-if="step === 1" @next="handleNext" />
      <preview v-else-if="step === 2" title="/images/ai-photo/title.png">
        <template #postures>
          <postures />
        </template>
        <template #generate-tip>
          <img
            src="/images/ai-photo/generate-tip.png"
            alt="确定卡通基础形象"
            class="generate-tip"
          />
        </template>
      </preview>
      <display v-else-if="step === 3" @next="handleNext" />
      <payment
        v-else-if="step === 4"
        src="/images/payment/ai-photo.png"
        :width="319"
        qrcode=""
      />
      <page-footer v-show="step === 1" />
      <pagination :step="step" :total="3" @click="handleBack" />
    </div>
  </main-layout>
</template>

<style lang="less" scoped>
.ai-photo {
  width: 100%;
  height: 100%;
  background-image: url("/images/ai-photo/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .generate-tip {
    position: absolute;
    left: 444px;
    bottom: 214px;
    width: 193px;
  }
}
</style>
