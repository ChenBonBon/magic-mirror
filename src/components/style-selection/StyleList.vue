<template>
  <div v-bind="containerProps" class="w-[901px] h-[1049px] scroll-smooth">
    <div v-bind="wrapperProps" class="flex flex-col gap-[10px]">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="grid grid-cols-3 grid-rows-[294px] gap-[10px]"
      >
        <div
          v-for="child in item.data"
          :key="child.style"
          class="relative"
          @click="handleClick(child.style)"
        >
          <img
            :src="child.imageUrl"
            class="w-full h-full rounded-[24px]"
            :alt="child.imageUrl"
          />
          <check
            :checked="selectedStyle === child.style"
            class="absolute top-[4px] right-[4px] w-[53px]"
          />
          <div
            class="absolute bottom-0 left-0 w-full h-12 leading-[48px] bg-[#4c4949b3] text-[32px] text-center text-white rounded-b-[24px]"
          >
            {{ child.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualList } from "@vueuse/core";
import { computed, ref } from "vue";
import type { Style } from "../../models/global";
import Check from "../Check.vue";

const props = defineProps<{
  styleList: Style[];
}>();

const emit = defineEmits<{ change: [styleId?: string] }>();

const selectedStyle = ref<string>();

const data = computed(() => {
  // 将数组按长度为 3 进行分割
  const result: Style[][] = [];

  props.styleList.forEach((_item, index) => {
    if (index % 3 === 0) {
      result.push(props.styleList.slice(index, index + 3));
    }
  });

  return result;
});

const { list, containerProps, wrapperProps } = useVirtualList(data, {
  itemHeight: 294,
});

function handleClick(styleId: string) {
  if (selectedStyle.value === styleId) {
    selectedStyle.value = undefined;
  } else {
    selectedStyle.value = styleId;
  }

  emit("change", selectedStyle.value);
}
</script>

<style lang="less" scoped></style>
