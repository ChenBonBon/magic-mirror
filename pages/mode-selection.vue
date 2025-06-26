<template>
  <div class="relative flex h-full w-full flex-col items-center">
    <img
      src="~/assets/img/mode-selection/title.png"
      alt="模式选择"
      class="mt-(--top-mode-selection-title) h-(--height-mode-selection-title) w-(--width-mode-selection-title)"
    />
    <img
      src="~/assets/img/mode-selection/back-btn.png"
      alt=""
      class="absolute top-(--top-mode-selection-back-btn) left-(--left-mode-selection-back-btn) h-(--height-mode-selection-back-btn) w-(--width-mode-selection-back-btn)"
      @click="back"
    />
    <div
      class="relative mt-(--top-mode-selection-mode-btn-group) flex h-(--height-mode-selection-mode-btn-group) w-full items-center justify-center"
    >
      <img
        v-show="selectedMode === 'q'"
        src="~/assets/img/mode-selection/ai-btn-default.png"
        alt="AI写真"
        class="absolute left-(--left-mode-selection-ai-btn-default) h-(--height-mode-selection-ai-btn-default) w-(--width-mode-selection-ai-btn-default)"
        @click="selectedMode = 'ai'"
      />
      <img
        v-show="selectedMode === 'ai'"
        src="~/assets/img/mode-selection/ai-btn-selected.png"
        alt="AI写真"
        class="absolute left-(--left-mode-selection-ai-btn-selected) h-(--height-mode-selection-ai-btn-selected) w-(--width-mode-selection-ai-btn-selected)"
      />
      <img
        src="~/assets/img/mode-selection/or-text.png"
        alt="OR"
        class="h-(--height-mode-selection-or-text) w-(--width-mode-selection-or-text)"
      />
      <img
        v-show="selectedMode === 'ai'"
        src="~/assets/img/mode-selection/q-btn-default.png"
        alt="Q版写真"
        class="absolute left-(--left-mode-selection-q-btn-default) h-(--height-mode-selection-q-btn-default) w-(--width-mode-selection-q-btn-default)"
        @click="selectedMode = 'q'"
      />
      <img
        v-show="selectedMode === 'q'"
        src="~/assets/img/mode-selection/q-btn-selected.png"
        alt="Q版写真"
        class="absolute left-(--left-mode-selection-q-btn-selected) h-(--height-mode-selection-q-btn-selected) w-(--width-mode-selection-q-btn-selected)"
      />
    </div>
    <img
      src="~/assets/img/mode-selection/confirm-btn.png"
      alt="确定"
      class="absolute top-(--top-mode-selection-confirm-btn) right-0 h-(--height-mode-selection-confirm-btn) w-(--width-mode-selection-confirm-btn)"
      @click="selectGender"
    />
    <img
      src="~/assets/img/mode-selection/privacy-tip.png"
      alt="隐私与免责温馨提示"
      class="mt-(--top-mode-selection-privacy-tip) h-(--height-mode-selection-privacy-tip) w-(--width-mode-selection-privacy-tip)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Mode } from "~/types/mode-selection";

const router = useRouter();

const selectedMode = ref<Mode>("ai");

function back() {
  router.push("/preview");
}

function selectGender() {
  router.push({
    name: "gender-selection",
    query: {
      mode: selectedMode.value,
    },
  });
}
</script>

<style lang="less" scoped></style>
