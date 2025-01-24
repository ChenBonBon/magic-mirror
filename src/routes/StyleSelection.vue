<template>
  <div class="relative w-full h-full">
    <back @back="handleBack" />
    <img
      :src="title"
      alt="风格选择"
      class="absolute top-[118px] left-[356px] w-[379px]"
    />
    <style-model-select
      class="absolute top-[353px] left-[411px] w-[324px]"
      @change="handleChangeStyleModel"
    />
    <img
      :src="line"
      alt=""
      class="absolute top-[531px] left-[42px] w-[995px]"
    />
    <img
      :src="shadow"
      alt=""
      class="absolute top-[527px] left-[32px] w-[1017px]"
    />
    <style-list
      :style-list="styleList"
      class="absolute top-[544px] left-[97px]"
      @change="handleChangeStyle"
    />
    <img
      :src="shadow"
      alt=""
      class="absolute top-[1605px] left-[32px] w-[1017px]"
    />
    <img
      :src="line"
      alt=""
      class="absolute top-[1626px] left-[42px w-[995px]"
    />
    <img
      :src="tipTop"
      alt="请点击左侧按钮选择您的属性"
      class="absolute top-[353px] left-[67px] w-[303px]"
    />
    <img
      :src="tipBottom"
      alt="上下滑动可查看更多风格"
      class="absolute top-[1697px] left-[313px] w-[447px]"
    />
    <privacy />
    <confirm v-show="selectedStyleId" @confirm="handleConfirm" />
    <audio src="/audios/style-selection.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import line from "../assets/images/style-selection/line.png";
import shadow from "../assets/images/style-selection/shadow.png";
import tipBottom from "../assets/images/style-selection/tip-bottom.png";
import tipTop from "../assets/images/style-selection/tip-top.png";
import title from "../assets/images/style-selection/title.png";
import Back from "../components/Back.vue";
import Confirm from "../components/Confirm.vue";
import Privacy from "../components/Privacy.vue";
import StyleList from "../components/style-selection/StyleList.vue";
import StyleModelSelect from "../components/style-selection/StyleModelSelect.vue";
import { StyleModel, type Style } from "../models/global";
import { getStyles } from "../services/global";

const router = useRouter();

const selectedStyleModelId = ref(StyleModel.Girl);
const styleList = ref<Style[]>([]);
const selectedStyleId = ref<string>();

async function getStyleList(modelId: StyleModel) {
  if (modelId > -1) {
    const res = await getStyles(modelId, 1);

    if (res) {
      styleList.value = res.data;
    }
  }
}

function handleChangeStyleModel(modelId: number) {
  selectedStyleModelId.value = modelId;
  getStyleList(modelId);
}

function handleChangeStyle(styleId?: string) {
  selectedStyleId.value = styleId;
}

function handleBack() {
  router.push("/");
}

function handleConfirm() {
  if (selectedStyleId.value) {
    router.push({
      path: "/collection-methods",
      query: {
        styleId: selectedStyleId.value,
      },
    });
  }
}

onMounted(() => {
  getStyleList(selectedStyleModelId.value);
});
</script>

<style lang="less" scoped></style>
