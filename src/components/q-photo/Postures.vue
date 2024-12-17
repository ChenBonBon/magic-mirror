<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCutePostures } from "../../services/photo";

const props = defineProps<{
  disabled: boolean;
  onClick: (key: string) => void;
}>();

const activeKey = ref("");
const images = ref<Record<string, string>>({});

function handleClick(key: string) {
  if (props.disabled) {
    return;
  }

  activeKey.value = key;

  props.onClick(key);
}

async function getData() {
  const res = await getCutePostures();

  if (res) {
    images.value = res.images;

    activeKey.value = Object.keys(res.images)[0];

    handleClick(activeKey.value);
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
  </div>
</template>

<style lang="less" scoped>
.postures {
  width: 688px;
  height: 188px;
  background-image: url(/images/q-photo/posture-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 1375px;
  left: 132px;
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
}
</style>
