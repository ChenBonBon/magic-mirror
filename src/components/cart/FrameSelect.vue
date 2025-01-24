<template>
  <van-overlay :show="visible" :z-index="100">
    <div class="w-full h-full relative" @click.stop>
      <img
        :src="back"
        class="absolute top-[54px] left-[51px] w-[355px]"
        @click="handleBack"
      />
      <div
        :style="'background-image: url(' + selectedFrame + ')'"
        class="absolute top-[207px] left-[185px] bg-full bg-no-repeat w-[720px] h-[720px]"
      >
        <img
          v-if="image"
          :src="image.itemUrl"
          class="w-[520px] ml-[101px] mt-[104px]"
        />
      </div>
      <div
        :style="'background-image: url(' + frameWrapper + ')'"
        class="absolute top-[1141px] left-[71px] bg-full bg-no-repeat w-[935px] h-[652px] px-10 py-6 grid grid-cols-4 grid-rows-[279px] gap-x-8 gap-y-[59px] overflow-y-auto"
      >
        <img
          v-for="item in frameList"
          :key="item.id"
          :src="item.imageUrl"
          @click="handleSelect(item.id)"
        />
      </div>
      <img
        :src="confirm"
        class="absolute top-[987px] left-[394px] w-[296px]"
        @click="handleConfirm"
      />
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import back from "../../assets/images/frame-select/back.png";
import confirm from "../../assets/images/frame-select/confirm.png";
import frameWrapper from "../../assets/images/frame-select/frame-wrapper.png";
import type { CartItem } from "../../models/cart";
import type { PhotoFrame } from "../../models/image";

const props = defineProps<{
  visible: boolean;
  image: CartItem | null;
  frameList: PhotoFrame[];
}>();

const emit = defineEmits<{
  close: [];
  confirm: [id: number];
}>();

const selectedFrameId = ref(-1);

const selectedFrame = computed(() => {
  const item = props.frameList.find(
    (item) => item.id === selectedFrameId.value
  );

  if (item) {
    return item.imageUrl;
  }

  return "";
});

function handleSelect(frameId: number) {
  selectedFrameId.value = frameId;
}

function handleBack() {
  if (props.image) {
    selectedFrameId.value = props.image.frameId;
  }

  emit("close");
}

function handleConfirm() {
  if (selectedFrameId.value === -1) {
    emit("close");
  } else {
    emit("confirm", selectedFrameId.value);
    emit("close");
  }
}

onMounted(() => {
  if (props.image) {
    const frameId = props.image.frameId;

    if (frameId) {
      selectedFrameId.value = frameId;
    }
  }
});
</script>

<style lang="less" scoped>
.image-list::-webkit-scrollbar {
  display: none;
}

.image-list {
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
