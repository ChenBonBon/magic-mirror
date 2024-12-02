<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  data: { src: string; alt: string }[];
  href: string;
  reverse?: boolean;
}>();

const router = useRouter();

function navigate() {
  router.push(props.href);
}
</script>

<template>
  <div class="marquee-wrapper" @click="navigate">
    <slot name="title" />
    <ul :class="['marquee', reverse ? 'reverse' : '']">
      <li v-for="(item, index) in data" :key="index" class="marquee-item">
        <img :src="item.src" :alt="item.alt" class="marquee-item-img" />
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.marquee-wrapper {
  .marquee {
    list-style-type: none;
    margin: 0;
    padding-top: 20px;
    padding-left: 0;
    animation: 15s move infinite linear;
    white-space: nowrap;
    font-size: 0;
    &.reverse {
      animation: 15s reverseMove infinite linear;
    }
    .marquee-item {
      width: 466px;
      height: 385px;
      display: inline-block;
      overflow: hidden;
      padding-right: 15px;
      .marquee-item-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.marquee-wrapper + .marquee-wrapper {
  margin-top: 75px;
}

@keyframes move {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(-100px - 3 * 466px - 3 * 15px);
  }
}

@keyframes reverseMove {
  0% {
    transform: translateX(-100px - 3 * 466px - 3 * 15px);
  }
  100% {
    transform: translateX(-100px);
  }
}
</style>
