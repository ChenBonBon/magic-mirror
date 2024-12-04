import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const photo = ref<Blob>();
  const cuteImage = ref("");
  const aiImage = ref("");
  const threeDImage = ref("");
  const cuteRecords = ref<string[]>([]);
  const aiRecords = ref<string[]>([]);
  const threeDRecords = ref<string[]>([]);
  const loading = ref(false);

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

  function set3DRecords(newRecords: string[]) {
    threeDRecords.value = newRecords;
  }

  function startLoading() {
    loading.value = true;
  }

  function stopLoading() {
    loading.value = false;
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
    loading,
    hasCuteImage,
    hasAIImage,
    has3DImage,
    setPhoto,
    clearPhoto,
    setCuteImage,
    setAIImage,
    set3DImage,
    setCuteRecords,
    setAIRecords,
    set3DRecords,
    startLoading,
    stopLoading,
  };
});
