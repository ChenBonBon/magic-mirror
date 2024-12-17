<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { generate3D, getImageRecords } from "../../services/photo";
import { useAppStore } from "../../useAppStore";
import ThreeDModel from "../3DModel.vue";
import Loading from "../Loading.vue";

defineProps<{
  title: string;
  onNext: () => void;
}>();

const startBackToHome = inject<() => void>("startBackToHome");
const clearBackToHome = inject<() => void>("clearBackToHome");

const store = useAppStore();

const selectedImage = ref(store.cuteImage);
const generated = ref(false);
const animation = ref(true);

const firstRecordStyle = computed(() => {
  if (store.cuteRecords.length === 1) {
    return {
      top: "1361px",
      left: "431px",
    };
  }

  return {
    top: "1321px",
    left: "118px",
  };
});

const secondRecordStyle = computed(() => {
  if (store.cuteRecords.length === 2) {
    return {
      top: "1321px",
      left: "752px",
    };
  }

  return {
    top: "1361px",
    left: "431px",
  };
});

function handleSelect(index: number) {
  selectedImage.value = store.cuteRecords[index];

  if (!store.has3DImage) {
    store.setCuteImage(store.cuteRecords[index]);
  }
}

async function generate() {
  if (store.threeDLoading) {
    return;
  }

  if (store.reachMax3D) {
    return;
  }

  if (selectedImage.value) {
    store.start3DLoading();
    clearBackToHome && clearBackToHome();
    animation.value = false;

    const res = await generate3D(selectedImage.value);

    if (res && res.status === "completed") {
      const image = res.modelUrls.find((item) => item.endsWith(".webp"));
      const model = res.modelUrls.find((item) => item.endsWith(".glb"));

      if (image && model) {
        store.set3DModel({ image, model });
        store.set3DRecords(res.history);
      }
      generated.value = true;
    }

    store.stop3DLoading();
    startBackToHome && startBackToHome();
  }
}

async function getHistoryRecords() {
  const res = await getImageRecords();

  if (res) {
    store.set3DRecords(res);
  }
}

function handleClick(index: number) {
  if (store.threeDLoading) {
    return;
  }

  const record = store.threeDRecords[index].modelUrls;

  const image = record.find((item) => item.endsWith(".webp"));
  const model = record.find((item) => item.endsWith(".glb"));

  if (image && model) {
    store.set3DModel({ image, model });
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
    <loading v-if="store.threeDLoading" :duration="120">
      <template #loading-bar>
        <img
          src="/images/3d-photo/loading-bar.png"
          alt="loading"
          class="loading-bar"
        />
      </template>
    </loading>
    <three-d-model
      v-if="store.has3DImage && store.threeDModel"
      :url="store.threeDModel.model"
      :width="640"
      :height="640"
      bg-color="#ff9a65"
    />
    <img v-else :src="store.cuteImage" alt="3D模型" class="preview-image" />
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
      v-if="store.threeDRecords[0]"
      :src="
        store.threeDRecords[0].modelUrls.find((item) => item.endsWith('.webp'))
      "
      alt="first"
      :class="[
        'first-record',
        store.threeDModel &&
        store.threeDModel.model ===
          store.threeDRecords[0].modelUrls.find((item) => item.endsWith('.glb'))
          ? 'selected'
          : '',
      ]"
      @click="handleClick(0)"
    />
    <div v-else class="first-record disabled">1</div>
    <img
      v-if="store.threeDRecords[1]"
      :src="
        store.threeDRecords[1].modelUrls.find((item) => item.endsWith('.webp'))
      "
      alt="second"
      :class="[
        'second-record',
        store.threeDModel &&
        store.threeDModel.model ===
          store.threeDRecords[1].modelUrls.find((item) => item.endsWith('.glb'))
          ? 'selected'
          : '',
      ]"
      @click="handleClick(1)"
    />
    <div v-else class="second-record disabled">2</div>
  </div>
  <div class="q-records">
    <img
      v-if="store.cuteRecords[0]"
      :src="store.cuteRecords[0]"
      alt="first"
      :class="[
        'first-record',
        selectedImage === store.cuteRecords[0] ? 'selected' : '',
      ]"
      :style="firstRecordStyle"
      @click="handleSelect(0)"
    />
    <img
      v-if="store.cuteRecords[1]"
      :src="store.cuteRecords[1]"
      alt="second"
      :class="[
        'second-record',
        selectedImage === store.cuteRecords[1] ? 'selected' : '',
      ]"
      :style="secondRecordStyle"
      @click="handleSelect(1)"
    />
    <img
      v-if="store.cuteRecords[2]"
      :src="store.cuteRecords[2]"
      alt="third"
      :class="[
        'third-record',
        selectedImage === store.cuteRecords[2] ? 'selected' : '',
      ]"
      @click="handleSelect(2)"
    />
  </div>
  <div
    class="actions"
    :style="{
      justifyContent:
        store.has3DImage && !store.reachMax3D ? 'space-between' : 'center',
    }"
  >
    <div
      :class="['generate-wrapper', animation ? 'not-clicked' : '']"
      v-show="!store.reachMax3D"
      @click="generate"
    >
      <img src="/images/q-photo/generate.png" alt="生成" class="generate" />
    </div>
    <div
      class="next-wrapper not-clicked"
      v-show="store.has3DImage"
      @click="onNext"
    >
      <img src="/images/q-photo/next.png" alt="下一步" class="next" />
    </div>
  </div>
  <slot name="generate-tip" />
  <audio v-if="generated" src="/audios/3d-generated.mp3" autoplay></audio>
  <audio v-else src="/audios/3d-preview.mp3" autoplay></audio>
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
  border-radius: 50%;
  overflow: hidden;
  .preview-image {
    width: 100%;
    height: 100%;
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
  .second-record {
    position: absolute;
    width: 216px;
    height: 216px;
    border-radius: 50%;
    border: 10px solid transparent;
    &.selected {
      border-color: #ffffff;
    }
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
    top: 1086px;
    left: 279px;
  }
  .second-record {
    top: 1086px;
    left: 580px;
  }
}
.q-records {
  .first-record,
  .second-record,
  .third-record {
    position: absolute;
    width: 216px;
    height: 216px;
    border-radius: 50%;
    border: 10px solid transparent;
    &.selected {
      border-color: #ffffff;
    }
  }
  .third-record {
    top: 1321px;
    left: 752px;
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
