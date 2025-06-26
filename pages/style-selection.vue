<template>
  <div class="relative flex h-full w-full flex-col items-center">
    <img
      src="~/assets/img/style-selection/title.png"
      alt="风格选择"
      class="mt-(--top-style-selection-title) h-(--height-style-selection-title) w-(--width-style-selection-title)"
    />
    <img
      src="~/assets/img/style-selection/back-btn.png"
      alt=""
      class="absolute top-(--top-style-selection-back-btn) left-(--left-style-selection-back-btn) h-(--height-style-selection-back-btn) w-(--width-style-selection-back-btn)"
      @click="back"
    />
    <div
      class="relative mt-(--top-style-selection-image-list) h-(--height-style-selection-image-list) w-(--width-style-selection-image-list)"
    >
      <img
        src="~/assets/img/style-selection/divide-line.png"
        alt="确定"
        class="absolute top-0 left-0 h-(--height-style-selection-divide-line) w-(--width-style-selection-divide-line)"
        @click="selectStyle"
      />
      <img
        src="~/assets/img/style-selection/divide-line.png"
        alt="确定"
        class="absolute bottom-0 left-0 h-(--height-style-selection-divide-line) w-(--width-style-selection-divide-line)"
        @click="selectStyle"
      />
    </div>
    <img
      src="~/assets/img/style-selection/confirm-btn.png"
      alt="确定"
      class="absolute top-(--top-style-selection-confirm-btn) right-0 h-(--height-style-selection-confirm-btn) w-(--width-style-selection-confirm-btn)"
      @click="selectStyle"
    />
    <img
      src="~/assets/img/style-selection/swipe-tip.png"
      alt="隐私与免责温馨提示"
      class="mt-(--top-style-selection-swipe-tip) h-(--height-style-selection-swipe-tip) w-(--width-style-selection-swipe-tip)"
    />
    <StyleSelectionGatheringMethod
      v-show="gatheringMethodVisible"
      @back="gatheringMethodVisible = false"
      @ok="selectGatheringMethod"
    />
  </div>
</template>

<script setup lang="ts">
import type { GatheringMethod } from "~/types/style-selection";

const route = useRoute();
const router = useRouter();

const selectedStyle = ref<string>("");
const gatheringMethodVisible = ref(false);
const uploadVisible = ref(false);

function back() {
  router.push({
    name: "gender-selection",
    query: {
      mode: route.query.mode,
    },
  });
}

function selectStyle() {
  gatheringMethodVisible.value = true;
}

function selectGatheringMethod(selectedGatheringMethod: GatheringMethod) {
  if (selectedGatheringMethod === "upload") {
    gatheringMethodVisible.value = false;
    uploadVisible.value = true;
  } else {
    router.push({
      name: "photo-collection",
      query: {
        ...route.query,
        style: selectedStyle.value,
        gatheringMethod: selectedGatheringMethod,
      },
    });
  }
}
</script>

<style lang="less" scoped></style>
