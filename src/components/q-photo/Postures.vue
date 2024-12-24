<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCutePostures } from "../../services/photo";
import Cursor from "../Cursor.vue";

const props = defineProps<{
  disabled: boolean;
  animation?: boolean;
  onChange: (key: string) => void;
  onClick: () => void;
}>();

const activeKey = ref("");
const images = ref<Record<string, string>>({});
const clicked = ref(false);

function handleClick(key: string) {
  if (props.disabled) {
    return;
  }

  activeKey.value = key;

  props.onChange(key);

  clicked.value = true;
  props.onClick();
}

async function getData() {
  const res = await getCutePostures();

  if (res) {
    images.value = res.images;

    activeKey.value = Object.keys(res.images)[0];

    props.onChange(activeKey.value);
  }
}

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="postures">
    <div class="postures-inner">
      <img
        v-for="(value, key) in images"
        :src="value"
        :alt="value"
        :class="['posture', activeKey === key ? 'active' : '']"
        @click="handleClick(key)"
      />
    </div>
    <cursor v-show="!clicked && animation" class="cursor" />
  </div>
</template>

<style lang="less" scoped>
.postures {
  width: 688px;
  height: 188px;
  background-image: url(/images/q-photo/posture-bg.png);
  background-size: 750px 188px;
  background-repeat: no-repeat;
  position: absolute;
  top: 1375px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 0px 36px;
  .postures-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    width: 780px;
    overflow: auto;
    .posture {
      border: 10px solid transparent;
      height: 112px;
      &.active {
        border-color: #ffffff;
      }
    }
  }
  .cursor {
    top: 20%;
    left: 40%;
    width: 200px;
    height: 200px;
  }
}
</style>
