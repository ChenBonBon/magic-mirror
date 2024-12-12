<script setup lang="ts">
import { useRouter } from "vue-router";
import { WorkflowType } from "../models/session";
import Loading from "./Loading.vue";

defineProps<{
  workflowType: WorkflowType;
}>();

const router = useRouter();

function handleBack() {
  router.push("/");
}
</script>

<template>
  <div class="print">
    <img
      src="/images/print/printing-en.png"
      alt="PRINTING IN PROGRESS"
      class="printing-en"
    />
    <img
      src="/images/print/printing-cn.png"
      alt="打印中 ······"
      class="printing-cn"
    />
    <button
      class="back-btn"
      :style="
        workflowType === 'cute'
          ? 'background-color: #fe867d'
          : 'background-color: #7280e3'
      "
      @click="handleBack"
    >
      回到首页
    </button>
    <div class="loading-wrapper">
      <loading percent-color="#000000" :duration="15">
        <template #loading-bar>
          <img
            :src="
              workflowType === 'cute'
                ? '/images/q-photo/loading-bar.png'
                : '/images/ai-photo/loading-bar.png'
            "
            alt="loading"
            class="loading-bar"
          />
        </template>
      </loading>
    </div>
  </div>
</template>

<style lang="less" scoped>
.print {
  width: 1020px;
  height: 1533px;
  position: absolute;
  top: 344px;
  left: 30px;
  background-image: url("/images/print/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .printing-en {
    width: 329px;
    position: absolute;
    top: 169px;
    left: 346px;
  }
  .printing-cn {
    width: 175px;
    position: absolute;
    top: 297px;
    left: 420px;
  }
  .qrcode {
    width: 186px;
    position: absolute;
    top: 1019px;
    left: 416px;
  }
}
.loading-wrapper {
  position: absolute;
  top: 465px;
  left: 338px;
  width: 382px;
  height: 382px;
  .loading-bar {
    width: 191px;
    padding: 10px;
  }
}
.back-btn {
  width: 400px;
  height: 75px;
  border-radius: 24px;
  font-size: 36px;
  border: none;
  position: absolute;
  bottom: 400px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
}
</style>
