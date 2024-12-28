<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from "vue";
import { generateImage, getImageRecords } from "../../services/photo";
import { getSessionId } from "../../services/session";
import { useAppStore } from "../../useAppStore";
import Back from "../Back.vue";
import Cursor from "../Cursor.vue";
import Loading from "../Loading.vue";
import Postures from "../q-photo/Postures.vue";

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

async function handleNext() {
  await getSessionId("To3d");
  props.onNext();
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

    animation.value = true;
    store.stopCuteLoading();
    startBackToHome && startBackToHome();
  }
}

function handleClick(record: string) {
  if (record) {
    store.setCuteImage(record);
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

onMounted(() => {
  getHistoryRecords();

  startBackToHome && startBackToHome();
});

onBeforeUnmount(() => {
  store.stopCuteLoading();
  clicked.value = false;
  posturesClicked.value = false;
  animation.value = true;

  clearBackToHome && clearBackToHome();
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
          src="/images/3d-photo/loading-bar.png"
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
    :animation="!posturesClicked && !store.reachMaxCute"
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
      class="generate-wrapper"
      @click="generate"
      v-show="!store.reachMaxCute"
    >
      <img src="/images/q-photo/generate.png" alt="生成" class="generate" />
      <cursor v-show="animation && posturesClicked" />
    </div>
    <div class="next-wrapper" v-show="store.hasCuteImage" @click="handleNext">
      <img src="/images/q-photo/next.png" alt="下一步" class="next" />
      <cursor v-show="store.reachMaxCute" />
    </div>
  </div>
  <img
    src="/images/q-photo/generate-tip.png"
    alt="生成最终Q版照片"
    class="generate-tip"
  />
  <audio v-if="generated" src="/audios/3d-preview-q.mp3" autoplay></audio>
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
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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
    position: relative;
    .generate {
      width: 279px;
    }
    .cursor {
      top: 0;
      left: 40%;
      width: 200px;
      height: 200px;
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
    position: relative;
    .next {
      width: 109px;
    }
    .cursor {
      top: 0;
      left: 40%;
      width: 200px;
      height: 200px;
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
