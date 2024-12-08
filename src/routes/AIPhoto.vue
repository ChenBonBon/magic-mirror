<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import Home from "../components/ai-photo/Home.vue";
import Preview from "../components/ai-photo/Preview.vue";
import Display from "../components/Display.vue";
import PageFooter from "../components/PageFooter.vue";
import Pagination from "../components/Pagination.vue";
import Payment from "../components/Payment.vue";
import PaymentSuccessful from "../components/PaymentSuccessful.vue";
import Print from "../components/Print.vue";
import MainLayout from "../layout/MainLayout.vue";
import { createOrder } from "../services/order";
import { print } from "../services/print";
import { useAppStore } from "../useAppStore";

const $toast = useToast();

const store = useAppStore();

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

async function handlePrint() {
  const res = await print(store.aiImage);

  if (res) {
    if (res.status === "success") {
      handleNext();
    } else if (res.status === "error") {
      $toast.error("打印失败", {
        position: "top",
      });
    } else if (res.status === "picnotfound") {
      $toast.error("图片不存在", {
        position: "top",
      });
    }
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
        @print="handleCreateOrder"
      />
      <payment
        v-else-if="step === 4"
        src="/images/payment/ai-photo.png"
        :width="319"
        :qrcode="qrcode"
        :bill-no="billNo"
        @prev="handlePrev"
        @next="handleNext"
      />
      <!-- <scan-successful v-else-if="step === 5" /> -->
      <payment-successful v-else-if="step === 5" @next="handlePrint" />
      <print workflow-type="aiPhoto" v-else-if="step === 6" />
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
