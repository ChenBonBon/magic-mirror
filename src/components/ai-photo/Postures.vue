<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Posture } from "../../models/photo";
import { getAIPostures } from "../../services/photo";

const props = defineProps<{
  disabled: boolean;
  animation: boolean;
  onClick: () => void;
  onChange: (key: string) => void;
}>();

const activeTab = ref(0);
const activeKey = ref("");
const postures = ref<Posture[]>([]);
const images = ref<Record<string, string>>({});
const clicked = ref(false);

function handleClickTab(type: number) {
  if (props.disabled) {
    return;
  }

  clicked.value = true;

  activeTab.value = type;
  images.value = postures.value.find((item) => item.type === type)!.images;
  activeKey.value = Object.keys(images.value)[0];

  handleClickPosture(activeKey.value);
  props.onClick();
}

function handleClickPosture(key: string) {
  if (props.disabled) {
    return;
  }

  clicked.value = true;

  activeKey.value = key;
  props.onChange(key);
  props.onClick();
}

async function getData() {
  const res = await getAIPostures();

  if (res) {
    postures.value = res;
    images.value = res[0].images;
    activeTab.value = res[0].type;
    activeKey.value = Object.keys(res[0].images)[0];

    props.onChange(activeKey.value);
  }
}

onMounted(() => {
  getData();
});
</script>

<template>
  <div
    :class="['postures-wrapper', clicked || !animation ? '' : 'not-clicked']"
  >
    <img
      src="/images/ai-photo/left-arrow.png"
      alt="left-arrow"
      class="left-arrow"
    />
    <div class="tabs">
      <div
        v-for="(tab, index) in postures"
        :class="['tab', activeTab === tab.type ? 'active' : '']"
        :key="'tab-' + index"
        @click="handleClickTab(tab.type)"
      >
        <span class="tab-text">{{ tab.title }}</span>
      </div>
    </div>
    <div class="postures">
      <div class="postures-inner">
        <div
          v-for="(value, key) in images"
          :class="['posture-wrapper', activeKey === key ? 'active' : '']"
          @click="handleClickPosture(key)"
        >
          <img :src="value" :alt="value" class="posture" />
        </div>
      </div>
    </div>
    <img
      src="/images/ai-photo/right-arrow.png"
      alt="right-arrow"
      class="right-arrow"
    />
  </div>
</template>

<style lang="less" scoped>
.postures-wrapper {
  position: absolute;
  top: 1371px;
  left: 63px;
  .left-arrow,
  .right-arrow {
    position: absolute;
    top: 106px;
    width: 29px;
  }
  .left-arrow {
    left: 0;
  }
  .right-arrow {
    left: 925px;
  }
  .tabs {
    position: absolute;
    top: -22px;
    left: 120px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    overflow: auto;
    max-width: 700px;
    .tab {
      width: 149px;
      height: 60px;
      background-image: url("/images/ai-photo/tab.png");
      background-size: 149px 60px;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      &.active {
        background-image: url("/images/ai-photo/tab-active.png");
        background-size: 149px 65px;
        background-repeat: no-repeat;
        height: 65px;
      }
      .tab-text {
        font-size: 24px;
      }
    }
  }
  .postures {
    width: 780px;
    height: 163px;
    background-image: url(/images/ai-photo/posture-bg.png);
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 43px;
    left: 51px;
    padding: 0px 36px;
    display: flex;
    align-items: center;
    .postures-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      width: 780px;
      overflow: auto;
      .posture-wrapper {
        width: 112px;
        height: 112px;
        background-image: url("/images/ai-photo/posture-wrapper.png");
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;
        border: 10px solid transparent;
        border-radius: 50%;
        flex-shrink: 0;
        &.active {
          border-color: #ffffff;
        }
        .posture {
          width: 112px;
        }
      }
    }
  }
}
</style>
