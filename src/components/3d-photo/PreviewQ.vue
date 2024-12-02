<script setup lang="ts">
import { ref } from "vue";
import { generateImage } from "../../services/photo";
import { useAppStore } from "../../useAppStore";
import Postures from "./Postures.vue";

const props = defineProps<{
  title: string;
  onNext: () => void;
}>();

const store = useAppStore();

const posture = ref(1);

function setPosture(index: number) {
  posture.value = index;
}

async function generate() {
  const res = await generateImage(store.photo, posture.value);

  if (res && res.status === "success") {
    store.setDisplayImage(res.imageUrl);
  }
}

function handleClick(record: string) {
  if (record) {
    store.setDisplayImage(record);

    props.onNext();
  } else {
    props.onNext();
  }
}
</script>

<template>
  <div class="title-wrapper">
    <img :src="title" alt="title" class="title" />
  </div>
  <div class="preview">
    <img :src="store.displayImage" alt="photo" class="photo" />
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
      v-if="store.records[0]"
      :src="store.records[0]"
      alt="first"
      class="first-record"
      @click="handleClick(store.records[0])"
    />
    <div
      v-else
      class="first-record disabled"
      @click="handleClick(store.records[0])"
    >
      1
    </div>
    <img
      v-if="store.records[1]"
      :src="store.records[1]"
      alt="second"
      class="second-record"
      @click="handleClick(store.records[1])"
    />
    <div v-else class="second-record disabled">2</div>
    <img
      v-if="store.records[2]"
      :src="store.records[2]"
      alt="third"
      class="third-record"
      @click="handleClick(store.records[2])"
    />
    <div v-else class="third-record disabled">3</div>
  </div>
  <postures @click="setPosture" />
  <div class="generate-wrapper" @click="generate">
    <img src="/images/q-photo/generate.png" alt="生成" class="generate" />
  </div>
  <img
    src="/images/q-photo/generate-tip.png"
    alt="生成最终Q版照片"
    class="generate-tip"
  />
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
    left: 35px;
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
    &.disabled {
      font-family: monospace;
      font-size: 80px;
      text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
        1px 1px 0 black;

      border-radius: 50%;
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
.generate-wrapper {
  position: absolute;
  left: 359px;
  bottom: 254px;
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
.generate-tip {
  position: absolute;
  left: 434px;
  bottom: 212px;
  width: 212px;
}
</style>
