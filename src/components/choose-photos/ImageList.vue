<template>
  <van-swipe :autoplay="2000">
    <van-swipe-item v-for="item in list" :key="item.image_id">
      <div class="flex justify-center items-center">
        <div
          class="relative w-fit h-[1000px]"
          @click="handleClick(item.image_id)"
        >
          <img :src="item.image_url" class="h-full rounded-[24px]" alt="" />
          <check
            :checked="selectedImageList.includes(item.image_id)"
            :show-default="true"
            class="absolute top-[4px] right-[4px] w-[53px]"
          />
        </div>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { GeneratedImage } from "../../models/image";
import Check from "../Check.vue";

defineProps<{
  list: GeneratedImage[];
}>();

const emit = defineEmits<{ change: [value: any[]] }>();

const selectedImageList = ref<number[]>([]);

function handleClick(id: number) {
  if (selectedImageList.value.includes(id)) {
    selectedImageList.value = selectedImageList.value.filter(
      (item) => item !== id
    );
  } else {
    selectedImageList.value.push(id);
  }
}

watch(
  selectedImageList,
  (val) => {
    emit("change", val);
  },
  { immediate: true, deep: true }
);
</script>

<style lang="less" scoped></style>
