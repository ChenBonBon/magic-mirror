<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
  onClick: () => void;
}>();

function handleClick() {
  if (props.disabled) {
    return;
  }

  props.onClick();
}
</script>

<template>
  <div class="back" @click="handleClick">
    <svg
      t="1734327771615"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4479"
      id="mx_n_1734327771616"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="64"
      height="64"
    >
      <path
        d="M881.49 536v241.24a65.05 65.05 0 0 1-64.86 64.87H225a65.06 65.06 0 0 1-64.87-64.87V536a64.39 64.39 0 0 1 10.76-35.68l55.51 48.82 49.6 43.62a76.33 76.33 0 0 0 54.44 22.54A77.68 77.68 0 0 0 408 537.78v-47.62c169.55 26.7 261.28 108.54 273 243.73 2.71 31.08 28.65 54.54 60.38 54.54a61.45 61.45 0 0 0 43.73-18.38 60.42 60.42 0 0 0 17.19-44c-1.73-68.32-14-164.87-60.21-254.86h74.59A65 65 0 0 1 881.49 536z"
        fill="currentColor"
        p-id="4480"
      ></path>
      <path
        d="M748.25 727.3a6.73 6.73 0 0 1-6.92 7.08c-2.81 0-6.21-1.52-6.48-5.14-6.22-71.78-37.84-193-193.19-258.1-47.89-20.06-107.52-34.82-181.84-41.14-0.54-0.05-1.08-0.05-1.62-0.05-1.41 0-2.81 0.1-4.22 0.1v107.73c0 14.22-11.56 23.46-23.56 23.46a22.66 22.66 0 0 1-17-7.62l-51.3-45.08-42.27-37.19-75.67-66.54a56.38 56.38 0 0 1 3.35-79.35L313.87 189A23.36 23.36 0 0 1 354 205.35v90.49c173.41 8.27 271.35 84.76 326.22 175.3 53.98 88.97 66.36 191.51 68.03 256.16z"
        fill="currentColor"
        p-id="4481"
      ></path>
    </svg>
    <span>返回</span>
  </div>
</template>

<style lang="less" scoped>
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 64px;
  color: #ffffff;
  background-color: #14def9;
  padding: 16px 100px;
  border-radius: 24px;
  box-shadow: 0px 8px 16px 0px rgba(20, 222, 249, 0.5);
  .back-icon {
    width: 64px;
  }
}
</style>
