<template>
  <div class="relative flex items-center w-[323px]">
    <img
      :src="minusIcon"
      alt="-"
      class="w-[124px] flex-shrink-0"
      @click="handleMinus"
    />
    <span class="flex-1 text-[53px] text-center">{{ quantity }}</span>
    <img
      :src="countBottom"
      alt=""
      class="absolute bottom-[12px] left-[103px] w-[122px]"
    />
    <img
      :src="addIcon"
      alt="+"
      class="w-[124px] flex-shrink-0"
      @click="handleAdd"
    />
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from "vant";
import addIcon from "../../assets/images/item-counter/add.png";
import countBottom from "../../assets/images/item-counter/count-bottom.png";
import minusIcon from "../../assets/images/item-counter/minus.png";

const props = defineProps<{
  quantity: number;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  change: [quantity: number];
  delete: [];
}>();

function handleAdd() {
  emit("change", props.quantity + 1);
}

async function handleMinus() {
  if (props.disabled) {
    return;
  }

  if (props.quantity > 1) {
    emit("change", props.quantity - 1);
  } else {
    try {
      const res = await showConfirmDialog({
        message: "确认从购物车中移除该商品",
      });

      if (res) {
        emit("delete");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style lang="less" scoped></style>
