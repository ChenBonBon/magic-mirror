<template>
  <div class="relative w-full h-full">
    <img
      :src="title"
      alt="模式选择"
      class="absolute top-[117px] left-[354px] w-[383px]"
    />
    <mode-select @change="handleModeChange" />
    <confirm @confirm="handleConfirm" />
    <cursor class="absolute top-[1281px] left-[905px] w-[125px]" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import title from "../assets/images/home/title.png";
import Confirm from "../components/Confirm.vue";
import Cursor from "../components/Cursor.vue";
import ModeSelect from "../components/home/ModeSelect.vue";

const router = useRouter();

function handleModeChange(path: string) {}

function handleConfirm() {
  router.push("/style-selection");
}
</script>

<style lang="less" scoped></style>
