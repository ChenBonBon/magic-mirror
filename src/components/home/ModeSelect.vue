<template>
  <div class="absolute top-[1403px] left-[146px] flex items-start gap-2">
    <img
      :src="leftMode.url"
      alt=""
      class="flex-shrink-0 w-[231px]"
      @click="handleClick(leftMode.id)"
    />
    <img
      :src="activeMode.url"
      class="flex-shrink-0 w-[318px] mt-[44px]"
      @click="handleClick(activeMode.id)"
    />
    <img
      :src="rightMode.url"
      class="flex-shrink-0 w-[231px]"
      @click="handleClick(rightMode.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import threedDreamWorkshop from "../../assets/images/home/3d-dream-workshop.png";
import artPhotography from "../../assets/images/home/art-photography.png";
import chibiCutePhotos from "../../assets/images/home/chibi-cute-photos.png";

const modeList = [
  { id: 0, url: chibiCutePhotos, name: "chibi-cute-photos" },
  { id: 1, url: threedDreamWorkshop, name: "3d-dream-workshop" },
  { id: 2, url: artPhotography, name: "art-photography" },
];

const emit = defineEmits<{ change: [path: string] }>();

const activeId = ref(0);

const activeMode = computed(() => {
  return modeList.find((item) => item.id === activeId.value)!;
});

const leftMode = computed(() => {
  return modeList.filter((item) => item.id !== activeId.value)[0];
});

const rightMode = computed(() => {
  return modeList.filter((item) => item.id !== activeId.value)[1];
});

watch(activeMode, (val) => {
  emit("change", val.name);
});

function handleClick(id: number) {
  activeId.value = id;
}
</script>

<style lang="less" scoped></style>
