<template>
  <div class="relative flex h-full w-full flex-col items-center">
    <img
      src="~/assets/img/gender-selection/title.png"
      alt="性别选择"
      class="mt-(--top-gender-selection-title) h-(--height-gender-selection-title) w-(--width-gender-selection-title)"
    />
    <img
      src="~/assets/img/gender-selection/back-btn.png"
      alt=""
      class="absolute top-(--top-gender-selection-back-btn) left-(--left-gender-selection-back-btn) h-(--height-gender-selection-back-btn) w-(--width-gender-selection-back-btn)"
      @click="back"
    />
    <div
      class="mt-(--top-gender-selection-gender-preview) rounded-full border-[16px] border-(--border-gender-selection-gender-preview)"
    >
      <img
        src="~/assets/img/gender-selection/gender-preview.png"
        alt="性别选择"
        class="h-(--height-gender-selection-gender-preview) w-(--width-gender-selection-gender-preview)"
      />
    </div>
    <img
      src="~/assets/img/gender-selection/confirm-btn.png"
      alt="确定"
      class="absolute top-(--top-gender-selection-confirm-btn) right-0 h-(--height-gender-selection-confirm-btn) w-(--width-gender-selection-confirm-btn)"
      @click="selectStyle"
    />
    <div
      class="mt-(--top-gender-selection-gender-group) grid h-(--height-gender-selection-gender-group) w-(--width-gender-selection-gender-group) grid-cols-2 grid-rows-2 gap-x-(--gap-x-gender-selection-gender-group) gap-y-(--gap-y-gender-selection-gender-group)"
    >
      <GenderSelectionGenderCard
        v-for="gender in genderList"
        :key="gender"
        :name="gender"
        :selected="selectedGender === gender"
        @click="selectedGender = gender"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Gender } from "~/types/gender-selection";

const genderList: Gender[] = ["female", "male", "girl", "boy"];

const route = useRoute();
const router = useRouter();

const selectedGender = ref<Gender>("female");

function back() {
  router.push("/mode-selection");
}

function selectStyle() {
  router.push({
    name: "style-selection",
    query: {
      ...route.query,
      gender: selectedGender.value,
    },
  });
}
</script>

<style lang="less" scoped></style>
