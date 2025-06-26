<template>
  <van-overlay show>
    <div class="relative flex h-full w-full flex-col items-center">
      <img
        src="~/assets/img/style-selection/gathering-method/title.png"
        alt="采集方式选择？"
        class="mt-(--top-style-selection-gathering-method-title) h-(--height-style-selection-gathering-method-title) w-(--width-style-selection-gathering-method-title)"
      />
      <img
        v-show="selectedGatheringMethod !== 'upload'"
        src="~/assets/img/style-selection/gathering-method/upload-btn-default.png"
        alt="上传照片"
        class="mt-(--top-style-selection-gathering-method-upload-btn-default) h-(--height-style-selection-gathering-method-upload-btn-default) w-(--width-style-selection-gathering-method-upload-btn-default)"
        @click="selectedGatheringMethod = 'upload'"
      />
      <img
        v-show="selectedGatheringMethod === 'upload'"
        src="~/assets/img/style-selection/gathering-method/upload-btn-selected.png"
        alt="上传照片"
        class="mt-(--top-style-selection-gathering-method-upload-btn-selected) h-(--height-style-selection-gathering-method-upload-btn-selected) w-(--width-style-selection-gathering-method-upload-btn-selected)"
      />
      <img
        src="~/assets/img/style-selection/gathering-method/or-text.png"
        alt="OR"
        class="mt-(--top-style-selection-gathering-method-or-text) h-(--height-style-selection-gathering-method-or-text) w-(--width-style-selection-gathering-method-or-text)"
      />
      <img
        v-show="selectedGatheringMethod !== 'takePhoto'"
        src="~/assets/img/style-selection/gathering-method/take-photo-btn-default.png"
        alt="现场拍摄"
        class="mt-(--top-style-selection-gathering-method-take-photo-btn-default) h-(--height-style-selection-gathering-method-take-photo-btn-default) w-(--width-style-selection-gathering-method-default)"
        @click="selectedGatheringMethod = 'takePhoto'"
      />
      <img
        v-show="selectedGatheringMethod === 'takePhoto'"
        src="~/assets/img/style-selection/gathering-method/take-photo-btn-selected.png"
        alt="现场拍摄"
        class="mt-(--top-style-selection-gathering-method-take-photo-btn-selected) h-(--height-style-selection-gathering-method-take-photo-btn-selected) w-(--width-style-selection-gathering-method-selected)"
      />
      <img
        src="~/assets/img/style-selection/gathering-method/back-btn.png"
        alt=""
        class="absolute top-(--top-style-selection-gathering-method-back-btn) left-(--left-style-selection-gathering-method-back-btn) h-(--height-style-selection-gathering-method-back-btn) w-(--width-style-selection-gathering-method-back-btn)"
        @click="handleBack"
      />
      <img
        src="~/assets/img/style-selection/gathering-method/confirm-btn.png"
        alt="确定"
        class="absolute top-(--top-style-selection-gathering-method-confirm-btn) right-0 h-(--height-style-selection-gathering-method-confirm-btn) w-(--width-style-selection-gathering-method-confirm-btn)"
        @click="handleOk"
      />
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import type { GatheringMethod } from "~/types/style-selection";

const emit = defineEmits<{
  back: [];
  ok: [value: GatheringMethod];
}>();

const selectedGatheringMethod = ref<GatheringMethod>("upload");

function handleBack() {
  emit("back");
}

function handleOk() {
  emit("ok", selectedGatheringMethod.value);
}
</script>

<style lang="less" scoped></style>
