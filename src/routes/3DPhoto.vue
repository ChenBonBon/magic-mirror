<script setup lang="ts">
import { ref } from "vue";
import Display from "../components/3d-photo/Display.vue";
import Home from "../components/3d-photo/Home.vue";
import Preview from "../components/3d-photo/Preview.vue";
import PreviewQ from "../components/3d-photo/PreviewQ.vue";
import PageFooter from "../components/PageFooter.vue";
import Pagination from "../components/Pagination.vue";
import Payment from "../components/Payment.vue";
import PaymentSuccessful from "../components/PaymentSuccessful.vue";
import { useBackToHome } from "../hooks/useBackToHome";
import MainLayout from "../layout/MainLayout.vue";
import { createOrder } from "../services/order";

useBackToHome();

const step = ref(1);
const qrcode = ref("");
const billNo = ref("");

function handleNext() {
  step.value += 1;
}

function handlePrev() {
  step.value -= 1;
}

function handleBack(newStep: number) {
  step.value = newStep;
}

async function handleCreateOrder() {
  const res = await createOrder();

  if (res) {
    qrcode.value = res.QRCode;
    billNo.value = res.billNo;

    handleNext();
  }
}
</script>

<template>
  <main-layout>
    <div class="three-d-photo">
      <home v-if="step === 1" @next="handleNext" />
      <preview-q
        v-else-if="step === 2"
        title="/images/q-photo/title.png"
        @next="handleCreateOrder"
      >
        <template #generate-tip>
          <img
            src="/images/q-photo/generate-tip.png"
            alt="生成最终Q版照片"
            class="generate-tip"
          />
        </template>
      </preview-q>
      <payment
        v-else-if="step === 3"
        src="/images/payment/3d-photo.png"
        :width="347"
        :qrcode="qrcode"
        :bill-no="billNo"
        @prev="handlePrev"
        @next="handleNext"
      />
      <!-- <scan-successful v-else-if="step === 4" /> -->
      <payment-successful v-else-if="step === 4" @next="handleNext" />
      <preview
        v-else-if="step === 5"
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
      <display v-else-if="step === 6" @next="handleNext" />
      <page-footer v-show="step === 1" />
      <pagination :step="step" :total="2" @click="handleBack" />
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
