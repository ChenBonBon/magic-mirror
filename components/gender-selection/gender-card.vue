<template>
  <div class="flex flex-col items-center justify-center gap-1.5">
    <img :src="imgSrc" alt="" :class="imgClass" />
    <img
      :src="textSrc"
      :alt="alt"
      class="h-(--height-gender-selection-gender-card-text) w-(--width-gender-selection-gender-card-text)"
    />
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";
import boyDefault from "~/assets/img/gender-selection/gender-card/boy-default.png";
import boySelected from "~/assets/img/gender-selection/gender-card/boy-selected.png";
import boy from "~/assets/img/gender-selection/gender-card/boy.png";
import femaleDefault from "~/assets/img/gender-selection/gender-card/female-default.png";
import femaleSelected from "~/assets/img/gender-selection/gender-card/female-selected.png";
import female from "~/assets/img/gender-selection/gender-card/female.png";
import girlDefault from "~/assets/img/gender-selection/gender-card/girl-default.png";
import girlSelected from "~/assets/img/gender-selection/gender-card/girl-selected.png";
import girl from "~/assets/img/gender-selection/gender-card/girl.png";
import maleDefault from "~/assets/img/gender-selection/gender-card/male-default.png";
import maleSelected from "~/assets/img/gender-selection/gender-card/male-selected.png";
import male from "~/assets/img/gender-selection/gender-card/male.png";
import type { Gender } from "~/types/gender-selection";

const props = defineProps<{
  name: Gender;
  selected?: boolean;
}>();

const genderMap: Record<Gender, any> = {
  female: {
    default: femaleDefault,
    selected: femaleSelected,
    text: female,
    alt: "女生",
  },
  male: {
    default: maleDefault,
    selected: maleSelected,
    text: male,
    alt: "男生",
  },
  girl: {
    default: girlDefault,
    selected: girlSelected,
    text: girl,
    alt: "女孩",
  },
  boy: {
    default: boyDefault,
    selected: boySelected,
    text: boy,
    alt: "男孩",
  },
};

const imgSrc = computed(() => {
  if (props.selected) {
    return genderMap[props.name].selected;
  } else {
    return genderMap[props.name].default;
  }
});

const textSrc = computed(() => {
  return genderMap[props.name].text;
});

const alt = computed(() => {
  return genderMap[props.name].alt;
});

const imgClass = computed(() => {
  return clsx({
    "h-(--height-gender-selection-gender-card-selected) w-(--width-gender-selection-gender-card-selected)":
      props.selected,
    "h-(--height-gender-selection-gender-card-default) w-(--width-gender-selection-gender-card-default)":
      !props.selected,
  });
});
</script>

<style lang="less" scoped></style>
