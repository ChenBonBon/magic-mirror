<script setup lang="ts">
import { onMounted, ref } from "vue";
import VueQrcode from "vue-qrcode";
import { useRouter } from "vue-router";
import { WorkflowType } from "../models/session";
import Loading from "./Loading.vue";

defineProps<{
  workflowType: WorkflowType;
}>();

const router = useRouter();

const completed = ref(false);

function handleBack() {
  router.push("/");
}

function handleCountdownEnd() {
  completed.value = true;
}

onMounted(() => {
  setTimeout(() => {
    handleBack();
  }, 120000);
});
</script>

<template>
  <div class="print">
    <div class="qrcodes">
      <div class="qrcode-wrapper">
        <vue-qrcode
          value="https://www.wjx.cn/vm/mBiHHhA.aspx#"
          class="qrcode"
          :color="{ dark: '#000000ff', light: '#ffffffff' }"
          type="image/png"
        />
        <img src="/images/question-tip.png" alt="qrcode" class="qrcode-tip" />
      </div>
    </div>
    <img
      v-if="!completed"
      src="/images/print/printing-en.png"
      alt="PRINTING IN PROGRESS"
      class="printing-en"
    />
    <div class="successful-outer" v-if="completed">
      <div class="successful-wrapper">
        <img
          src="/images/print/printing-complete.png"
          alt="PRINTING IS COMPLETE"
          class="successful-en"
        />
        <img
          src="/images/print/printing-complete-cn.png"
          alt="打印完成"
          class="successful-cn"
        />
      </div>
    </div>
    <img
      v-else
      src="/images/print/printing-cn.png"
      alt="打印中 ······"
      class="printing-cn"
    />
    <button
      v-if="completed"
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
    <div class="loading-wrapper" v-if="!completed">
      <loading
        percent-color="#000000"
        :duration="20"
        @countdown-end="handleCountdownEnd"
      >
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
.qrcodes {
  position: absolute;
  top: 64px;
  left: 64px;
  display: flex;
  gap: 63px;
  .qrcode-wrapper {
    display: flex;
    flex-direction: column;
    width: 171px;
    background: black;
    align-items: center;
    padding: 12px 0;
    gap: 8px;
    .qrcode {
      width: 143px;
    }
    .qrcode-tip {
      width: 87px;
    }
  }
}
.successful-outer {
  width: 576px;
  height: 562px;
  position: absolute;
  top: 261px;
  left: 218px;
  background-image: url("/images/payment/stars.png");
  background-size: cover;
  background-repeat: no-repeat;
  .successful-wrapper {
    width: 491px;
    height: 473px;
    position: absolute;
    top: 66px;
    left: 47px;
    background-image: url("/images/payment/successful-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 22px;
    .successful-en {
      width: 320px;
    }
    .successful-cn {
      width: 310px;
    }
  }
}
</style>
