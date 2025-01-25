<template>
  <div class="relative w-full h-full">
    <back @back="handleBack" />
    <img
      :src="title"
      alt="选择相片"
      class="absolute top-[118px] left-[355px] w-[378px]"
    />
    <swiper-container
      :slides-per-view="1"
      :centered-slides="true"
      class="absolute top-[325px] left-[200px] w-[650px] h-[650px] rounded-[24px]"
      @swiper="handleActiveSwiper"
      @slide-change="handleActiveSlideChange"
    >
      <swiper-slide v-for="item in cartList" :key="item.imageId" :lazy="true">
        <div class="relative w-full h-full">
          <img
            :src="item.fixedUrl"
            :alt="item.fixedUrl"
            class="w-full h-full rounded-[24px]"
            loading="lazy"
          />
          <div
            :style="'background-image: url(' + countWrapper + ')'"
            class="absolute top-0 right-0 flex w-[78px] h-[78px] bg-full bg-no-repeat text-[32px]"
          >
            <span class="pt-3 pl-6">
              {{ quantity }}
            </span>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
    <img
      :src="line"
      class="absolute top-[1055px] left-[113px] w-[3px] h-[256px] z-10"
    />
    <img
      :src="shadow"
      class="absolute top-[1052px] left-[110px] w-[17px] h-[269px]"
    />
    <swiper-container
      :slides-per-view="3"
      :space-between="24"
      class="absolute top-[1053px] left-[132px] w-[826px] h-[264px]"
      @swiper="handleSwiper"
      @click="handleClick"
    >
      <swiper-slide v-for="item in cartList" :key="item.imageId" :lazy="true">
        <div class="relative w-full h-full">
          <img
            :src="item.fixedUrl"
            :alt="item.fixedUrl"
            class="w-[264px] h-[264px] rounded-[24px]"
            loading="lazy"
          />
          <div
            :style="'background-image: url(' + countWrapper + ')'"
            class="absolute top-0 right-0 flex w-[41px] h-[41px] bg-full bg-no-repeat text-[16px]"
          >
            <span class="pt-1.5 pl-3.5">
              {{ item.quantity }}
            </span>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
    <img
      :src="shadow"
      class="absolute top-[1052px] left-[953px] w-[17px] h-[269px]"
    />
    <img
      :src="line"
      class="absolute top-[1055px] left-[964px] w-[3px] h-[256px] z-10"
    />
    <img :src="tip" class="absolute top-[1340px] left-[280px] w-[531px]" />
    <img :src="frameTip" class="absolute top-[1399px] left-[410px] w-[271px]" />
    <item-counter
      :quantity="quantity"
      class="absolute top-[1460px] left-[382px]"
      @change="handleChange"
      @delete="handleDelete"
    />
    <img
      :src="chooseFrame"
      class="absolute top-[1597px] left-[363px] w-[362px]"
      @click="frameSelectVisible = true"
    />
    <img
      :src="skip"
      class="absolute top-[1734px] left-[401px] w-[283px]"
      @click="handleSkip"
    />
    <confirm @confirm="handleConfirm" />
    <frame-select
      :visible="frameSelectVisible"
      :image="activeImage"
      :frameList="frameList"
      @close="frameSelectVisible = false"
      @confirm="handleSelectFrame"
    />
    <audio src="/audios/cart.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import type Swiper from "swiper";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import chooseFrame from "../assets/images/cart/choose-frame.png";
import countWrapper from "../assets/images/cart/count-wrapper.png";
import frameTip from "../assets/images/cart/frame-tip.png";
import line from "../assets/images/cart/line.png";
import shadow from "../assets/images/cart/shadow.png";
import skip from "../assets/images/cart/skip.png";
import tip from "../assets/images/cart/tip.png";
import title from "../assets/images/choose-photos/title.png";
import Back from "../components/Back.vue";
import FrameSelect from "../components/cart/FrameSelect.vue";
import ItemCounter from "../components/cart/ItemCounter.vue";
import Confirm from "../components/Confirm.vue";
import type { CartItem } from "../models/cart";
import type { PhotoFrame } from "../models/image";
import {
  deleteGoods,
  deleteGoodsAll,
  getCart,
  updateCart,
} from "../services/cart";
import { combineImages, getPhotoFrames } from "../services/image";
import { useStore } from "../store";

const router = useRouter();
const route = useRoute();
const store = useStore();

const activeSwiperRef = ref<Swiper>();
const swiperRef = ref<Swiper>();
const activeIndex = ref(0);
const cartList = ref<CartItem[]>([]);
const frameList = ref<PhotoFrame[]>([]);
const frameSelectVisible = ref(false);

const activeImage = computed(() => {
  if (cartList.value.length > 0) {
    return cartList.value[activeIndex.value];
  }

  return null;
});

const activeImageId = computed(() => {
  if (cartList.value.length > 0) {
    return cartList.value[activeIndex.value].imageId;
  }

  return -1;
});

const quantity = computed(() => {
  if (cartList.value.length > 0) {
    return cartList.value[activeIndex.value].quantity;
  }

  return 0;
});

const count = computed(() => {
  return cartList.value.reduce((total, item) => total + item.quantity, 0);
});

watch(activeIndex, (val) => {
  if (activeSwiperRef.value && activeSwiperRef.value.activeIndex !== val) {
    activeSwiperRef.value.slideTo(val);
  }

  if (swiperRef.value && swiperRef.value.activeIndex !== val) {
    swiperRef.value.slideTo(val);
  }
});

async function getCartList() {
  const res = await getCart();

  if (res) {
    cartList.value = res.data;
  }
}

async function handleChange(newQuantity: number) {
  if (activeImageId.value > -1) {
    const res = await updateCart(activeImageId.value, newQuantity);

    if (res) {
      cartList.value = res.data;
    }
  }
}

async function handleDelete() {
  if (activeImageId.value > -1) {
    const res = await deleteGoods(activeImageId.value);

    if (res) {
      cartList.value = res.data;

      if (activeIndex.value >= cartList.value.length) {
        activeIndex.value = cartList.value.length - 1;
      }
    }
  }
}

async function getPhotoFrameList() {
  const res = await getPhotoFrames();

  if (res) {
    frameList.value = res.data;
  }
}

async function handleSelectFrame(frameId: number) {
  const res = await combineImages(activeImageId.value, frameId);

  if (res) {
    cartList.value = res.data;
  }
}

function handleActiveSwiper(swiper: Swiper) {
  activeSwiperRef.value = swiper;
}

function handleSwiper(swiper: Swiper) {
  swiperRef.value = swiper;
}

function handleActiveSlideChange(swiper: Swiper) {
  activeIndex.value = swiper.activeIndex;
}

function handleClick(swiper: Swiper) {
  activeIndex.value = swiper.clickedIndex;
}

async function handleBack() {
  const res = await deleteGoodsAll();

  if (res) {
    router.push({ path: "/choose-photos", query: route.query });
  }
}

function handleSkip() {
  store.setCount(count.value);
  router.push({ path: "/payment", query: route.query });
}

function handleConfirm() {
  store.setCount(count.value);
  router.push({ path: "/payment", query: route.query });
}

onMounted(() => {
  getCartList();
  getPhotoFrameList();
});
</script>

<style lang="less" scoped></style>
