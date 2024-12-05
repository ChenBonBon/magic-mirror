<script setup lang="ts">
import { WorkflowType } from "../models/session";
import Loading from "./Loading.vue";

defineProps<{
  workflowType: WorkflowType;
}>();
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
    <div class="loading-wrapper">
      <loading>
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
    <img src="/images/wechat.jpg" alt="qrcode" class="qrcode" />
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
</style>
