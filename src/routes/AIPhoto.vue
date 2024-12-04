<script setup lang="ts">
import { ref } from "vue";
import Home from "../components/ai-photo/Home.vue";
import Preview from "../components/ai-photo/Preview.vue";
import Display from "../components/Display.vue";
import PageFooter from "../components/PageFooter.vue";
import Pagination from "../components/Pagination.vue";
import Payment from "../components/Payment.vue";
import PaymentSuccessful from "../components/PaymentSuccessful.vue";
import Print from "../components/Print.vue";
import ScanSuccessful from "../components/ScanSuccessful.vue";
import MainLayout from "../layout/MainLayout.vue";
import { createOrder } from "../services/order";
import { useAppStore } from "../useAppStore";

const store = useAppStore();

const step = ref(1);
const qrcode = ref("");

function handleNext() {
  step.value += 1;
}

function handleBack(newStep: number) {
  step.value = newStep;
}

async function handlePrint() {
  const res = await createOrder("aiPhoto", store.aiImage);

  if (res) {
    qrcode.value = res.qrCode;
    handleNext();
  }
}
</script>

<template>
  <main-layout>
    <div class="ai-photo">
      <home v-if="step === 1" @next="handleNext" />
      <preview
        v-else-if="step === 2"
        title="/images/ai-photo/title.png"
        @next="handleNext"
      >
        <template #generate-tip>
          <img
            src="/images/ai-photo/generate-tip.png"
            alt="确定卡通基础形象"
            class="generate-tip"
          />
        </template>
      </preview>
      <display
        v-else-if="step === 3"
        workflow-type="aiPhoto"
        @print="handlePrint"
      />
      <payment
        v-else-if="step === 4"
        src="/images/payment/ai-photo.png"
        :width="319"
        :qrcode="qrcode"
      />
      <scan-successful v-else-if="step === 5" />
      <payment-successful v-else-if="step === 6" @next="handleNext" />
      <print v-else-if="step === 7" />
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
