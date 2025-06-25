<template>
  <swiper-component
    v-if="visible"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :loop="true"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
    :coverflow-effect="{
      rotate: 0,
      scale: 0.6,
      stretch: 80,
    }"
    effect="coverflow"
    :grabCursor="true"
    class="w-full h-[1000px]"
    :modules="[Autoplay, EffectCoverflow]"
  >
    <swiper-slide
      v-for="(item, index) in list"
      :key="index"
      class="w-[700px] flex justify-center items-center"
    >
      <img :src="item" class="w-full h-full rounded-[24px]" />
    </swiper-slide>
  </swiper-component>
</template>

<script setup lang="ts">
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/vue";
import { onMounted, ref, watch } from "vue";
import getCarouselImages from "../../services/global";

const visible = ref(false);
const list = ref<string[]>([]);

async function init() {
  const res = await getCarouselImages();

  if (res) {
    list.value = res.data;
  }
}

watch(list, (val) => {
  if (val.length > 0) {
    visible.value = true;
  }
});

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped></style>
