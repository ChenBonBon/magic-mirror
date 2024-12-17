<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from "vue";
import { generateImage, getImageRecords } from "../../services/photo";
import { useAppStore } from "../../useAppStore";
import Back from "../Back.vue";
import Loading from "../Loading.vue";
import Postures from "./Postures.vue";

const props = defineProps<{
  title: string;
  onNext: () => void;
  onBack: () => void;
}>();

const startBackToHome = inject<() => void>("startBackToHome");
const clearBackToHome = inject<() => void>("clearBackToHome");

const store = useAppStore();

const posture = ref("");
const generated = ref(false);
const clicked = ref(false);
const animation = ref(true);
const posturesClicked = ref(false);

function handleBack() {
  if (clicked.value) {
    return;
  }

  clicked.value = true;
  props.onBack();

  setTimeout(() => {
    clicked.value = false;
  }, 1000);
}

function setPosture(key: string) {
  posture.value = key;
}

async function generate() {
  if (store.cuteLoading) {
    return;
  }

  if (store.reachMaxCute) {
    return;
  }

  if (store.hasPhoto) {
    store.startCuteLoading();
    clearBackToHome && clearBackToHome();
    animation.value = false;
    posturesClicked.value = true;

    const res = await generateImage(store.photo!, posture.value);

    if (res && res.status === "completed") {
      store.setCuteImage(res.imageUrl);
      store.setCuteRecords(res.history.map((item) => item.imageUrl));
      generated.value = true;
    }

    store.stopCuteLoading();
    startBackToHome && startBackToHome();
  }
}

async function getHistoryRecords() {
  const res = await getImageRecords();

  if (res) {
    store.setCuteRecords(res.map((item) => item.imageUrl));
    if (res.length > 0) {
      store.setCuteImage(res[0].imageUrl);
    }
  }
}

function handleClick(record: string) {
  if (store.cuteLoading) {
    return;
  }

  if (record) {
    store.setCuteImage(record);
  }
}

onMounted(() => {
  getHistoryRecords();
});

onBeforeUnmount(() => {
  store.stopCuteLoading();
  clicked.value = false;
  posturesClicked.value = false;
  animation.value = true;
});
</script>

<template>
  <div class="title-wrapper">
    <img :src="title" alt="title" class="title" />
  </div>
  <div class="preview">
    <loading v-if="store.cuteLoading">
      <template #loading-bar>
        <img
          src="/images/q-photo/loading-bar.png"
          alt="loading"
          class="loading-bar"
        />
      </template>
    </loading>
    <img
      :src="store.hasCuteImage ? store.cuteImage : store.originalImage"
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
      v-if="store.cuteRecords[0]"
      :src="store.cuteRecords[0]"
      alt="first"
      class="first-record"
      @click="handleClick(store.cuteRecords[0])"
    />
    <div
      v-else
      class="first-record disabled"
      @click="handleClick(store.cuteRecords[0])"
    >
      1
    </div>
    <img
      v-if="store.cuteRecords[1]"
      :src="store.cuteRecords[1]"
      alt="second"
      class="second-record"
      @click="handleClick(store.cuteRecords[1])"
    />
    <div v-else class="second-record disabled">2</div>
    <img
      v-if="store.cuteRecords[2]"
      :src="store.cuteRecords[2]"
      alt="third"
      class="third-record"
      @click="handleClick(store.cuteRecords[2])"
    />
    <div v-else class="third-record disabled">3</div>
  </div>
  <postures
    :disabled="store.cuteLoading"
    @change="setPosture"
    @click="posturesClicked = true"
  />
  <div
    class="actions"
    :style="{
      justifyContent:
        store.hasCuteImage && !store.reachMaxCute ? 'space-between' : 'center',
    }"
  >
    <div
      :class="[
        'generate-wrapper',
        animation && posturesClicked ? 'not-clicked' : '',
      ]"
      v-show="!store.reachMaxCute"
      @click="generate"
    >
      <img src="/images/q-photo/generate.png" alt="生成" class="generate" />
    </div>
    <div
      class="next-wrapper not-clicked"
      v-show="store.hasCuteImage"
      @click="onNext"
    >
      <img src="/images/q-photo/next.png" alt="下一步" class="next" />
    </div>
  </div>
  <img
    src="/images/q-photo/generate-tip.png"
    alt="生成最终Q版照片"
    class="generate-tip"
  />
  <audio v-if="generated" src="/audios/q-generated.mp3" autoplay></audio>
  <audio v-else src="/audios/q-preview.mp3" autoplay></audio>
  <back :disabled="store.cuteLoading" @click="handleBack" />
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .title {
    width: 175px;
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
.generate-tip {
  position: absolute;
  left: 434px;
  bottom: 212px;
  width: 212px;
}
.loading-bar {
  width: 342px;
}
</style>
