<template>
  <Head>
    <Title>次元魔镜 - Dimensional · Magic Mirror</Title>
    <Meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
  </Head>
  <NuxtLayout>
    <van-config-provider :theme-vars="themeVars">
      <NuxtPage />
    </van-config-provider>
  </NuxtLayout>
</template>

<script setup lang="ts">
useTouch();

const themeVars = reactive({
  overlayBackground: "rgba(0, 0, 0, 0.45)",
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
