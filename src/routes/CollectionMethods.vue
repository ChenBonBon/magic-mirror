<template>
  <div class="relative w-full h-full">
    <back @back="handleBack" />
    <img
      :src="title"
      alt="采集方式"
      class="absolute top-[117px] left-[298px] w-[493px]"
    />
    <img
      :src="takePhotos"
      alt="现场拍摄"
      class="absolute top-[610px] left-[349px] w-[392px]"
      @click="handleTakePhotos"
    />
    <img
      :src="uploadPhotos"
      alt="上传照片"
      class="absolute top-[1014px] left-[354px] w-[392px]"
      @click="handleUploadPhotos"
    />
    <cursor class="absolute top-[1211px] left-[658px] w-[132px]" />
    <van-overlay :show="visible" @click="handleClose">
      <div class="" @click.stop>
        <img :src="uploadTip" class="w-[591px] mt-[664px] ml-[245px]" />
        <vue-qrcode
          :value="qrcode"
          class="w-[376px] mt-[71px] ml-[360px] rounded-[24px]"
          :color="{ dark: '#000000ff', light: '#ffffffff' }"
          type="image/png"
        />
      </div>
    </van-overlay>
    <audio src="/audios/collection-methods.mp3" autoplay loop />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueQrcode from "vue-qrcode";
import { useRoute, useRouter } from "vue-router";
import takePhotos from "../assets/images/collection-methods/take-photos.png";
import title from "../assets/images/collection-methods/title.png";
import uploadPhotos from "../assets/images/collection-methods/upload-photos.png";
import uploadTip from "../assets/images/collection-methods/upload-tip.png";
import Back from "../components/Back.vue";
import Cursor from "../components/Cursor.vue";
import { getSessionId } from "../services/session";

const qrcode = ref("http://www.hfotion.cn:3577/upload");
const visible = ref(false);

const router = useRouter();
const route = useRoute();

function handleTakePhotos() {
  router.push({ path: "photo-collection", query: route.query });
}

async function handleUploadPhotos() {
  const res = await getSessionId();

  if (res) {
    const sessionId = res.data.sessionId;
    qrcode.value = qrcode.value + "?sessionId=" + sessionId;
    window.localStorage.setItem("magic-mirror-session", sessionId);
    visible.value = true;
  }
}

function handleBack() {
  router.push("/style-selection");
}

function handleClose() {
  visible.value = false;
}
</script>

<style lang="less" scoped></style>
