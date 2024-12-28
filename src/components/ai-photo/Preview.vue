<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue";
import { GenerateRecord } from "../../models/photo";
import { generateAI, getImageRecords } from "../../services/photo";
import { useAppStore } from "../../useAppStore";
import Back from "../Back.vue";
import Cursor from "../Cursor.vue";
import Loading from "../Loading.vue";
import Attributes, { Gender, Pose } from "./Attributes.vue";
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
const selectedGender = ref<Gender>("Man");
const selectedPose = ref<Pose>("pose1");
const generated = ref(false);
const clicked = ref(false);
const attributesClicked = ref(false);
const postureClicked = ref(false);
const animation = ref(true);

const firstRecord = computed(() => {
  if (store.aiRecords.length > 0) {
    if (selectedPose.value === "pose1") {
      return store.aiRecords[0].imageUrls[0];
    }

    return store.aiRecords[0].imageUrls[1];
  }
});

const secondRecord = computed(() => {
  if (store.aiRecords.length > 1) {
    if (selectedPose.value === "pose1") {
      return store.aiRecords[1].imageUrls[0];
    }

    return store.aiRecords[1].imageUrls[1];
  }
});

const thirdRecord = computed(() => {
  if (store.aiRecords.length > 2) {
    if (selectedPose.value === "pose1") {
      return store.aiRecords[2].imageUrls[0];
    }

    return store.aiRecords[2].imageUrls[1];
  }
});

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
  if (store.aiLoading) {
    return;
  }

  if (store.reachMaxAI) {
    return;
  }

  if (store.hasPhoto) {
    store.startAILoading();
    clearBackToHome && clearBackToHome();
    animation.value = false;
    attributesClicked.value = true;
    postureClicked.value = true;

    const res = await generateAI(
      store.photo!,
      posture.value,
      selectedGender.value
    );

    if (res && res.status === "completed") {
      const aiImage =
        selectedPose.value === "pose1" ? res.imageUrls[0] : res.imageUrls[1];
      store.setAIImage(aiImage);
      store.setAIRecords(res.history);
      generated.value = true;
    }

    animation.value = true;
    store.stopAILoading();
    startBackToHome && startBackToHome();
  }
}

async function getHistoryRecords() {
  const res = await getImageRecords();

  if (res) {
    store.setAIRecords(res);
    if (res.length > 0) {
      store.setCuteImage(res[0].imageUrl);
    }
  }
}

function handleClick(record: GenerateRecord) {
  if (store.aiLoading) {
    return;
  }

  if (record) {
    const aiImage =
      selectedPose.value === "pose1"
        ? record.imageUrls[0]
        : record.imageUrls[1];
    store.setAIImage(aiImage);
  }
}

function handleChangeGender(gender: Gender) {
  selectedGender.value = gender;
}

function handleChangePose(pose: Pose) {
  selectedPose.value = pose;
}

function handleClickPosture() {
  attributesClicked.value = true;
  postureClicked.value = true;
}

onMounted(() => {
  getHistoryRecords();

  startBackToHome && startBackToHome();
});

onBeforeUnmount(() => {
  clicked.value = false;
  attributesClicked.value = false;
  postureClicked.value = false;
  animation.value = true;

  store.stopAILoading();

  clearBackToHome && clearBackToHome();
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
  <div class="records">
    <img
      v-if="store.aiRecords[0]"
      :src="firstRecord"
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
      :src="secondRecord"
      alt="second"
      class="second-record"
      @click="handleClick(store.aiRecords[1])"
    />
    <div v-else class="second-record disabled">2</div>
    <img
      v-if="store.aiRecords[2]"
      :src="thirdRecord"
      alt="third"
      class="third-record"
      @click="handleClick(store.aiRecords[2])"
    />
    <div v-else class="third-record disabled">3</div>
  </div>
  <attributes
    :gender="selectedGender"
    :pose="selectedPose"
    :animation="!attributesClicked"
    @click="attributesClicked = true"
    @change-gender="handleChangeGender"
    @change-pose="handleChangePose"
  />
  <postures
    :disabled="store.aiLoading"
    :animation="attributesClicked && !postureClicked"
    @change="setPosture"
    @click="handleClickPosture"
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
      <cursor
        v-show="animation && attributesClicked && postureClicked"
        class="cursor"
      />
    </div>
    <div class="next-wrapper" v-show="store.hasAIImage" @click="onNext">
      <img src="/images/q-photo/next.png" alt="下一步" class="next" />
      <cursor v-show="store.reachMaxAI" class="cursor" />
    </div>
  </div>
  <slot name="generate-tip" />
  <audio v-if="generated" src="/audios/ai-generated.mp3" autoplay></audio>
  <audio v-else src="/audios/ai-preview.mp3" autoplay></audio>
  <back :disabled="store.aiLoading" @click="handleBack" />
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
    width: 150px;
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
    width: 169px;
    height: 169px;
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
    top: 1063px;
    left: 610px;
  }
  .second-record {
    top: 937px;
    left: 821px;
  }
  .third-record {
    top: 694px;
    left: 897px;
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
      top: 20%;
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
.loading-bar {
  width: 342px;
}
</style>
