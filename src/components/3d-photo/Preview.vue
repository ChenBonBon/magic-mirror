<script setup lang="ts">
import { onMounted } from "vue";
import { generate3D, getImageRecords } from "../../services/photo";
import { useAppStore } from "../../useAppStore";

const props = defineProps<{
  title: string;
  onNext: () => void;
}>();

const store = useAppStore();

async function generate() {
  if (store.hasPhoto) {
    store.startLoading();

    const res = await generate3D(store.cuteImage);

    if (res && res.status === "completed") {
      const webpUrl = res.modelUrls.find((item) => item.endsWith(".webp"));
      if (webpUrl) {
        store.set3DImage(webpUrl);
      }
    }

    store.stopLoading();
  }
}

async function getHistoryRecords() {
  const res = await getImageRecords();

  if (res) {
    store.set3DRecords(res.map((item) => item.imageUrl));
  }
}

function handleClick(record: string) {
  if (record) {
    store.set3DImage(record);

    props.onNext();
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
    <img :src="store.threeDImage" alt="3D模型" />
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
      src="/images/q-photo/record.png"
      alt="first"
      class="first-record"
      @click="handleClick(store.threeDRecords[0])"
    />
    <img
      src="/images/q-photo/record.png"
      alt="second"
      class="second-record"
      @click="handleClick(store.threeDRecords[1])"
    />
    <img
      src="/images/q-photo/record.png"
      alt="third"
      class="third-record"
      @click="handleClick(store.threeDRecords[2])"
    />
    <img
      src="/images/q-photo/record.png"
      alt="forth"
      class="forth-record"
      @click="handleClick(store.threeDRecords[3])"
    />
    <img
      src="/images/q-photo/record.png"
      alt="fifth"
      class="fifth-record"
      @click="handleClick(store.threeDRecords[4])"
    />
    <img
      src="/images/q-photo/record.png"
      alt="sixth"
      class="sixth-record"
      @click="handleClick(store.threeDRecords[5])"
    />
  </div>
  <div
    class="actions"
    :style="{ justifyContent: store.has3DImage ? 'space-between' : 'center' }"
  >
    <div class="generate-wrapper" @click="generate">
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
  }
  .forth-record,
  .fifth-record,
  .sixth-record {
    position: absolute;
    width: 216px;
    height: 216px;
  }
  .first-record {
    top: 981px;
    left: 107px;
  }
  .second-record {
    top: 1082px;
    left: 428px;
  }
  .third-record {
    top: 981px;
    right: 106px;
  }
  .forth-record {
    top: 1259px;
    left: 149px;
  }
  .fifth-record {
    top: 1349px;
    left: 440px;
  }
  .sixth-record {
    top: 1259px;
    right: 149px;
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
</style>
