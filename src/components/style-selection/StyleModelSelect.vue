<template>
  <div class="grid grid-rows-2 grid-cols-2 gap-x-[68px] gap-y-6">
    <img
      :src="girlSrc"
      alt="女孩"
      class="w-[128px]"
      @click="handleClick(StyleModel.Girl)"
    />
    <img
      :src="boySrc"
      alt="男孩"
      class="w-[128px]"
      @click="handleClick(StyleModel.Boy)"
    />
    <img
      :src="womanSrc"
      alt="女士"
      class="w-[128px]"
      @click="handleClick(StyleModel.Woman)"
    />
    <img
      :src="manSrc"
      alt="男士"
      class="w-[128px]"
      @click="handleClick(StyleModel.Man)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import boySelected from "../../assets/images/style-select/boy-selected.png";
import boy from "../../assets/images/style-select/boy.png";
import girlSelected from "../../assets/images/style-select/girl-selected.png";
import girl from "../../assets/images/style-select/girl.png";
import manSelected from "../../assets/images/style-select/man-selected.png";
import man from "../../assets/images/style-select/man.png";
import womanSelected from "../../assets/images/style-select/woman-selected.png";
import woman from "../../assets/images/style-select/woman.png";
import { StyleModel } from "../../models/global";

const emit = defineEmits<{ change: [styleId: number] }>();

const selectedStyleModelId = ref<StyleModel>(StyleModel.Girl);

const girlSrc = computed(() => {
  return selectedStyleModelId.value === StyleModel.Girl ? girlSelected : girl;
});

const boySrc = computed(() => {
  return selectedStyleModelId.value === StyleModel.Boy ? boySelected : boy;
});

const womanSrc = computed(() => {
  return selectedStyleModelId.value === StyleModel.Woman
    ? womanSelected
    : woman;
});

const manSrc = computed(() => {
  return selectedStyleModelId.value === StyleModel.Man ? manSelected : man;
});

function handleClick(styleModelId: number) {
  selectedStyleModelId.value = styleModelId;
  emit("change", styleModelId);
}
</script>

<style lang="less" scoped></style>
