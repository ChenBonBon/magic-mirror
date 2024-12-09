import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { ThreeDModel } from "./models/model";
import { Generate3DRecord } from "./models/photo";

export const useAppStore = defineStore("app", () => {
  const photo = ref<Blob>();
  const originalImage = ref("");
  const cuteImage = ref("");
  const aiImage = ref("");
  const threeDModel = ref<ThreeDModel>();
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

  const reachMaxCute = computed(() => {
    return cuteRecords.value.length >= 3;
  });

  const reachMaxAI = computed(() => {
    return aiRecords.value.length >= 3;
  });

  const reachMax3D = computed(() => {
    return threeDRecords.value.length >= 2;
  });

  function setPhoto(data: Blob) {
    photo.value = data;
  }

  function setOriginalImage(url: string) {
    originalImage.value = url;
  }

  function clearPhoto() {
    photo.value = undefined;
  }

  function clearOriginalImage() {
    originalImage.value = "";
  }

  function setCuteImage(url: string) {
    cuteImage.value = url;
  }
  function setAIImage(url: string) {
    aiImage.value = url;
  }
  function set3DModel(model: ThreeDModel) {
    threeDModel.value = model;
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

  function clearCuteRecords() {
    cuteRecords.value = [];
  }

  function clearAIRecords() {
    aiRecords.value = [];
  }

  function clear3DRecords() {
    threeDRecords.value = [];
  }

  return {
    photo,
    hasPhoto,
    cuteImage,
    aiImage,
    threeDModel,
    cuteRecords,
    aiRecords,
    threeDRecords,
    cuteLoading,
    hasCuteImage,
    hasAIImage,
    has3DImage,
    aiLoading,
    threeDLoading,
    originalImage,
    reachMaxCute,
    reachMaxAI,
    reachMax3D,
    setPhoto,
    setOriginalImage,
    clearPhoto,
    clearOriginalImage,
    setCuteImage,
    setAIImage,
    set3DModel,
    setCuteRecords,
    setAIRecords,
    set3DRecords,
    startCuteLoading,
    stopCuteLoading,
    startAILoading,
    stopAILoading,
    start3DLoading,
    stop3DLoading,
    clearCuteRecords,
    clearAIRecords,
    clear3DRecords,
  };
});
