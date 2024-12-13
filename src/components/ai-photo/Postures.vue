<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  disabled: boolean;
  onClickTab: (key: string) => void;
  onClickPosture: (index: number) => void;
}>();

const activeTab = ref("Movies");
const activeIndex = ref(0);

const tabs = [
  { title: "电影", key: "Movies" },
  { title: "动漫", key: "Cartoons" },
  { title: "游戏", key: "Games" },
];

const postures: Record<string, string[]> = {
  Movies: [
    "/images/ai-photo/tab-1/1.png",
    "/images/ai-photo/tab-1/2.png",
    "/images/ai-photo/tab-1/3.png",
    "/images/ai-photo/tab-1/4.png",
    "/images/ai-photo/tab-1/5.png",
  ],
  Cartoons: [
    "/images/ai-photo/tab-2/1.png",
    "/images/ai-photo/tab-2/2.png",
    "/images/ai-photo/tab-2/3.png",
    "/images/ai-photo/tab-2/4.png",
    "/images/ai-photo/tab-2/5.png",
    "/images/ai-photo/tab-2/6.png",
  ],
  Games: [
    "/images/ai-photo/tab-3/1.png",
    "/images/ai-photo/tab-3/2.png",
    "/images/ai-photo/tab-3/3.png",
    "/images/ai-photo/tab-3/4.png",
    "/images/ai-photo/tab-3/5.png",
    "/images/ai-photo/tab-3/6.png",
    "/images/ai-photo/tab-3/7.png",
  ],
};

function handleClickTab(key: string) {
  if (props.disabled) {
    return;
  }

  activeIndex.value = 0;
  activeTab.value = key;
  props.onClickTab(key);
}

function handleClickPosture(index: number) {
  if (props.disabled) {
    return;
  }

  activeIndex.value = index;
  props.onClickPosture(index);
}
</script>

<template>
  <div class="postures-wrapper">
    <img
      src="/images/ai-photo/left-arrow.png"
      alt="left-arrow"
      class="left-arrow"
    />
    <div class="tabs">
      <div
        :class="['tab', activeTab === tab.key ? 'active' : '']"
        v-for="(tab, index) in tabs"
        :key="'tab-' + index"
        @click="handleClickTab(tab.key)"
      >
        <span class="tab-text">{{ tab.title }}</span>
      </div>
    </div>
    <div class="postures">
      <div class="postures-inner">
        <div
          v-for="(item, index) in postures[activeTab]"
          :key="'posture-' + index"
          :class="['posture-wrapper', activeIndex === index ? 'active' : '']"
          @click="handleClickPosture(index)"
        >
          <img :src="item" :alt="item" class="posture" />
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
    top: 0;
    left: 149px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    .tab {
      width: 149px;
      height: 38px;
      background-image: url("/images/ai-photo/tab.png");
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background-image: url("/images/ai-photo/tab-active.png");
        background-size: cover;
        background-repeat: no-repeat;
        height: 43px;
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
