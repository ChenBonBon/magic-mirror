<script setup lang="ts">
import { onMounted, ref } from "vue";
import { generateAI, getImageRecords } from "../../services/photo";
import { useAppStore } from "../../useAppStore";
import Loading from "../Loading.vue";
import Postures from "./Postures.vue";

defineProps<{
  title: string;
  onNext: () => void;
}>();

const store = useAppStore();

const tab = ref("Movies");
const posture = ref(0);

function setTab(index: string) {
  tab.value = index;
}

function setPosture(index: number) {
  posture.value = index;
}

async function generate() {
  if (store.aiLoading) {
    return;
  }

  if (store.reachMaxAI) {
    return;
  }

  if (store.hasPhoto) {
    store.startAILoading();

    const res = await generateAI(store.photo!, tab.value, posture.value);

    if (res && res.status === "completed") {
      store.setAIImage(res.imageUrl);
      store.setAIRecords(res.history.map((item) => item.imageUrl));
    }

    store.stopAILoading();
  }
}

async function getHistoryRecords() {
  const res = await getImageRecords();

  if (res) {
    store.setAIRecords(res.map((item) => item.imageUrl));
    if (res.length > 0) {
      store.setCuteImage(res[0].imageUrl);
    }
  }
}

function handleClick(record: string) {
  if (store.aiLoading) {
    return;
  }

  if (record) {
    store.setAIImage(record);
  }
}

onMounted(() => {
  getHistoryRecords();
});
</script>

<template>
  <div class="title-wrapper">
    <img :src="title" alt="title" class="title" />
  </div>
  <div class="preview">
    <loading v-if="store.aiLoading">
      <template #loading-bar>
        <img
          src="/images/ai-photo/loading-bar.png"
          alt="loading"
          class="loading-bar"
        />
      </template>
    </loading>
    <img
      :src="store.hasAIImage ? store.aiImage : store.originalImage"
      alt="photo"
      class="photo"
    />
  </div>
  <slot name="preview-tip" />
  <div class="step-4-wrapper">
    <img src="/images/q-photo/step-4.png" alt="4" class="step-4" />
    <img
      src="/images/q-photo/step-4-tip.png"
      alt="第四步 预览历史生成形象 选择你喜欢的动作"
      class="step-4-tip"
    />
  </div>
  <div class="records">
    <img
      v-if="store.aiRecords[0]"
      :src="store.aiRecords[0]"
      alt="first"
      class="first-record"
      @click="handleClick(store.aiRecords[0])"
    />
    <div
      v-else
      class="first-record disabled"
      @click="handleClick(store.aiRecords[0])"
    >
      1
    </div>
    <img
      v-if="store.aiRecords[1]"
      :src="store.aiRecords[1]"
      alt="second"
      class="second-record"
      @click="handleClick(store.aiRecords[1])"
    />
    <div v-else class="second-record disabled">2</div>
    <img
      v-if="store.aiRecords[2]"
      :src="store.aiRecords[2]"
      alt="third"
      class="third-record"
      @click="handleClick(store.aiRecords[2])"
    />
    <div v-else class="third-record disabled">3</div>
  </div>
  <postures
    :disabled="store.aiLoading"
    @click-tab="setTab"
    @click-posture="setPosture"
  />
  <div
    class="actions"
    :style="{
      justifyContent:
        store.hasAIImage && !store.reachMaxAI ? 'space-between' : 'center',
    }"
  >
    <div class="generate-wrapper" v-show="!store.reachMaxAI" @click="generate">
      <img src="/images/q-photo/generate.png" alt="生成" class="generate" />
    </div>
    <div class="next-wrapper" v-show="store.hasAIImage" @click="onNext">
      <img src="/images/q-photo/next.png" alt="下一步" class="next" />
    </div>
  </div>
  <slot name="generate-tip" />
</template>

<style lang="less" scoped>
.title-wrapper {
  position: absolute;
  top: 379px;
  left: 204px;
  width: 153px;
  height: 153px;
  background-image: url("/images/q-photo/title-wrapper.png");
  background-size: cover;
  background-repeat: no-repeat;
  .title {
    width: 86px;
    height: 86px;
    position: absolute;
    top: 30px;
    left: 37px;
  }
}
.preview {
  position: absolute;
  top: 412px;
  left: 220px;
  width: 640px;
  height: 640px;
  background-image: url("/images/q-photo/preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  .photo {
    width: 640px;
    height: 640px;
    border-radius: 50%;
  }
}
.step-4-wrapper {
  position: absolute;
  top: 396px;
  left: 872px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  .step-4 {
    width: 26px;
  }
  .step-4-tip {
    width: 115px;
    margin-left: 3px;
  }
}
.records {
  .first-record,
  .second-record,
  .third-record {
    position: absolute;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    &.disabled {
      font-size: 80px;
      text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
        1px 1px 0 black;
      background: #e6e6e6;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .first-record {
    top: 990px;
    left: 122px;
  }
  .second-record {
    top: 1080px;
    left: 428px;
  }
  .third-record {
    top: 981px;
    right: 106px;
  }
}
.actions {
  position: absolute;
  left: 132px;
  bottom: 254px;
  width: 816px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .generate-wrapper {
    width: 363px;
    height: 57px;
    background-image: url("/images/q-photo/generate-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .generate {
      width: 279px;
    }
  }
  .next-wrapper {
    width: 363px;
    height: 57px;
    background-image: url("/images/q-photo/next-wrapper.png");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .next {
      width: 109px;
    }
  }
}
.loading-bar {
  width: 342px;
}
</style>
