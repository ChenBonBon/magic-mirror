<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref(0);
const activeIndex = ref(1);

const tabs = ["COSPLAY", "主题二", "主题三", "主题四"];

function handleClickTab(index: number) {
  activeTab.value = index;
}

function handleClickPosture(index: number) {
  activeIndex.value = index;
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
        :class="['tab', activeTab === index ? 'active' : '']"
        v-for="(tab, index) in tabs"
        :key="'tab-' + index"
        @click="handleClickTab(index)"
      >
        <img
          :src="'/images/ai-photo/tab-' + (index + 1) + '.png'"
          :alt="tab"
          class="tab-text"
        />
      </div>
    </div>
    <div class="postures">
      <div
        v-for="i in 6"
        :key="'posture-' + i"
        class="posture-wrapper"
        @click="handleClickPosture(i)"
      >
        <img
          :src="'/images/ai-photo/posture-' + i + '.png'"
          :alt="'posture-' + i"
          class="posture"
        />
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
      &.active {
        background-image: url("/images/ai-photo/tab-active.png");
        background-size: cover;
        background-repeat: no-repeat;
        height: 43px;
      }
      .tab-text {
        &:first-of-type {
          top: 12px;
          height: 18px;
        }
        position: absolute;
        top: 10px;
        height: 22px;
      }
    }
  }
  .postures {
    width: 822px;
    height: 163px;
    background-image: url("/images/ai-photo/posture-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 43px;
    left: 51px;
    display: flex;
    gap: 24px;
    padding-left: 30px;
    .posture-wrapper {
      width: 112px;
      height: 112px;
      background-image: url("/images/ai-photo/posture-wrapper.png");
      background-size: cover;
      background-repeat: no-repeat;
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      .posture {
        width: 101px;
      }
    }
  }
}
</style>
