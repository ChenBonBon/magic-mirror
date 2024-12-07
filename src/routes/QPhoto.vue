<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import Display3D from "../components/3d-photo/Display.vue";
import Preview3D from "../components/3d-photo/Preview.vue";
import Display from "../components/Display.vue";
import PageFooter from "../components/PageFooter.vue";
import Pagination from "../components/Pagination.vue";
import Payment from "../components/Payment.vue";
import PaymentSuccessful from "../components/PaymentSuccessful.vue";
import Print from "../components/Print.vue";
import Home from "../components/q-photo/Home.vue";
import Preview from "../components/q-photo/Preview.vue";
import MainLayout from "../layout/MainLayout.vue";
import { createOrder } from "../services/order";
import { print } from "../services/print";
import { getSessionId } from "../services/session";
import { useAppStore } from "../useAppStore";

const $toast = useToast();

const store = useAppStore();

const step = ref(1);
const qrcode = ref("");
const billNo = ref("");
const workflowType = ref("cute");

function handleNext() {
  step.value += 1;
}

function handlePrev() {
  step.value -= 1;
}

function handleBack(newStep: number) {
  step.value = newStep;
}

async function handleCreatePrintOrder() {
  workflowType.value = "cute";
  const res = await createOrder();

  if (res) {
    qrcode.value = res.QRCode;
    billNo.value = res.billNo;
    handleNext();
  }
}

async function handleCreateGenerate3DOrder() {
  await getSessionId("To3d");
  workflowType.value = "To3d";
  const res = await createOrder();

  if (res) {
    qrcode.value = res.QRCode;
    billNo.value = res.billNo;
    handleNext();
  }
}

async function handlePrint() {
  const res = await print(store.cuteImage);

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
    <div class="q-photo">
      <home v-if="step === 1" @next="handleNext" />
      <preview
        v-else-if="step === 2"
        title="/images/q-photo/title.png"
        @next="handleNext"
      >
        <template #generate-tip>
          <img
            src="/images/q-photo/generate-tip.png"
            alt="生成最终Q版照片"
            class="generate-tip"
          />
        </template>
      </preview>
      <display
        v-else-if="step === 3"
        workflow-type="cute"
        @print="handleCreatePrintOrder"
        @generate3-d="handleCreateGenerate3DOrder"
      />
      <payment
        v-else-if="step === 4"
        :src="
          workflowType === 'cute'
            ? '/images/payment/q-photo.png'
            : '/images/payment/3d-photo.png'
        "
        :width="workflowType === 'cute' ? 388 : 347"
        :qrcode="qrcode"
        :bill-no="billNo"
        @prev="handlePrev"
        @next="handleNext"
      />
      <!-- <scan-successful v-else-if="step === 5" /> -->
      <payment-successful v-else-if="step === 5" @next="handlePrint" />
      <print
        workflow-type="cute"
        v-else-if="step === 6 && workflowType === 'cute'"
      />
      <Preview3D
        v-else-if="step === 6 && workflowType === 'To3d'"
        title="/images/3d-photo/title.png"
        @next="handleNext"
      >
        <template #preview-tip>
          <img
            src="/images/3d-photo/preview-tip.png"
            alt="3D模型生成  3D MODEL"
            class="preview-tip-3d"
          />
        </template>
        <template #generate-tip>
          <img
            src="/images/3d-photo/generate-tip.png"
            alt="生成最终3D模型"
            class="generate-tip-3d"
          />
        </template>
      </Preview3D>
      <Display3D v-else-if="step === 7" @next="handleNext" />
      <page-footer v-show="step === 1" />
      <pagination :step="step" :total="3" @click="handleBack" />
    </div>
  </main-layout>
</template>

<style lang="less" scoped>
.q-photo {
  width: 100%;
  height: 100%;
  background-image: url("/images/q-photo/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .generate-tip {
    position: absolute;
    left: 434px;
    bottom: 212px;
    width: 212px;
  }
}
.loading-bar {
  width: 185px;
  margin: 17px;
}
.preview-tip-3d {
  position: absolute;
  top: 361px;
  right: 170px;
  width: 339px;
}
.generate-tip-3d {
  position: absolute;
  bottom: 214px;
  left: 432px;
  width: 217px;
}
</style>
