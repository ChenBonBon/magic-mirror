import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Generate3DRecord } from "./models/photo";

export const useAppStore = defineStore("app", () => {
  const photo = ref<Blob>();
  const cuteImage = ref("");
  const aiImage = ref("");
  const threeDImage = ref("");
  const cuteRecords = ref<string[]>([]);
  const aiRecords = ref<string[]>([]);
  const threeDRecords = ref<Generate3DRecord[]>([]);
  const cuteLoading = ref(false);
  const aiLoading = ref(false);
  const threeDLoading = ref(false);

  const hasPhoto = computed(() => {
    return typeof photo.value !== "undefined";
  });

  const hasCuteImage = computed(() => {
    return cuteRecords.value.length > 0;
  });

  const hasAIImage = computed(() => {
    return aiRecords.value.length > 0;
  });

  const has3DImage = computed(() => {
    return threeDRecords.value.length > 0;
  });

  function setPhoto(data: Blob) {
    photo.value = data;
  }

  function clearPhoto() {
    photo.value = undefined;
  }

  function setCuteImage(url: string) {
    cuteImage.value = url;
  }
  function setAIImage(url: string) {
    aiImage.value = url;
  }
  function set3DImage(url: string) {
    threeDImage.value = url;
  }

  function setCuteRecords(newRecords: string[]) {
    cuteRecords.value = newRecords;
  }

  function setAIRecords(newRecords: string[]) {
    aiRecords.value = newRecords;
  }

  function set3DRecords(newRecords: Generate3DRecord[]) {
    threeDRecords.value = newRecords;
  }

  function startCuteLoading() {
    cuteLoading.value = true;
  }

  function stopCuteLoading() {
    cuteLoading.value = false;
  }
  function startAILoading() {
    aiLoading.value = true;
  }

  function stopAILoading() {
    aiLoading.value = false;
  }
  function start3DLoading() {
    threeDLoading.value = true;
  }

  function stop3DLoading() {
    threeDLoading.value = false;
  }

  return {
    photo,
    hasPhoto,
    cuteImage,
    aiImage,
    threeDImage,
    cuteRecords,
    aiRecords,
    threeDRecords,
    cuteLoading,
    hasCuteImage,
    hasAIImage,
    has3DImage,
    aiLoading,
    threeDLoading,
    setPhoto,
    clearPhoto,
    setCuteImage,
    setAIImage,
    set3DImage,
    setCuteRecords,
    setAIRecords,
    set3DRecords,
    startCuteLoading,
    stopCuteLoading,
    startAILoading,
    stopAILoading,
    start3DLoading,
    stop3DLoading,
  };
});
