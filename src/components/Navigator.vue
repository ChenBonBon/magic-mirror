<script setup lang="ts">
import { useRouter } from "vue-router";
import { NavigatorItem } from "../models/navigator";

defineProps<{
  active: NavigatorItem;
  inactives: NavigatorItem[];
}>();

const router = useRouter();

function navigate(href?: string) {
  window.localStorage.removeItem("magic-mirror-sessionId");
  if (href) {
    router.push(href);
  }
}
</script>

<template>
  <div class="navigator">
    <div class="active-wrapper">
      <img
        :src="active.src"
        :alt="active.alt"
        class="active"
        :width="active.width"
      />
    </div>
    <div
      class="inactive-wrapper"
      v-for="inactive in inactives"
      :key="inactive.src"
      @click="navigate(inactive.href)"
    >
      <img
        :src="inactive.src"
        :alt="inactive.alt"
        class="inactive"
        :width="inactive.width"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.navigator {
  position: absolute;
  top: 495px;
  left: 7px;
  .active-wrapper,
  .inactive-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active-wrapper {
    width: 231px;
    height: 231px;
    background-image: url("/images/navigator/active-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 117px;
  }
  .inactive-wrapper {
    width: 143px;
    height: 143px;
    background-image: url("/images/navigator/inactive-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    &:nth-child(even) {
      top: 244px;
      left: 12px;
    }
    &:nth-child(odd) {
      top: 436px;
      left: 0;
    }
  }
}
</style>
