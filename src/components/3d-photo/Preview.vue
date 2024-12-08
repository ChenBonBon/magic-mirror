<script setup lang="ts">
import { onMounted } from "vue";
import { generate3D, getImageRecords } from "../../services/photo";
import { useAppStore } from "../../useAppStore";
import ThreeDModel from "../3DModel.vue";
import Loading from "../Loading.vue";

defineProps<{
  title: string;
  onNext: () => void;
}>();

const store = useAppStore();

async function generate() {
  if (store.threeDLoading) {
    return;
  }

  if (store.reachMax3D) {
    return;
  }

  if (store.hasPhoto) {
    store.start3DLoading();

    const res = await generate3D(store.cuteImage);

    if (res && res.status === "completed") {
      const image = res.modelUrls.find((item) => item.endsWith(".webp"));
      const model = res.modelUrls.find((item) => item.endsWith(".glb"));

      if (image && model) {
        store.set3DModel({ image, model });
        store.set3DRecords(res.history);
      }
    }

    store.stop3DLoading();
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
      class="first-record"
      @click="handleClick(0)"
    />
    <div v-else class="first-record disabled">1</div>
    <img
      v-if="store.threeDRecords[1]"
      :src="
        store.threeDRecords[1].modelUrls.find((item) => item.endsWith('.webp'))
      "
      alt="second"
      class="second-record"
      @click="handleClick(1)"
    />
    <div v-else class="second-record disabled">2</div>
    <img
      v-if="store.threeDRecords[2]"
      :src="
        store.threeDRecords[2].modelUrls.find((item) => item.endsWith('.webp'))
      "
      alt="third"
      class="third-record"
      @click="handleClick(2)"
    />
    <div v-else class="third-record disabled">3</div>
  </div>
  <div
    class="actions"
    :style="{
      justifyContent:
        store.has3DImage && !store.reachMax3D ? 'space-between' : 'center',
    }"
  >
    <div class="generate-wrapper" v-show="!store.reachMax3D" @click="generate">
      <img src="/images/q-photo/generate.png" alt="生成" class="generate" />
    </div>
    <div class="next-wrapper" v-show="store.has3DImage" @click="onNext">
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
  z-index: 1;
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
