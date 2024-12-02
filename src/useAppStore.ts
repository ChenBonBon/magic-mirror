import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const photo = ref("");
  const displayImage = ref("");
  const records = ref<string[]>([]);

  const hasPhoto = computed(() => {
    return photo.value.length > 0;
  });

  function setPhoto(url: string) {
    photo.value = url;
  }

  function clearPhoto() {
    photo.value = "";
  }

  function setDisplayImage(url: string) {
    displayImage.value = url;
  }

  function setRecords(newRecords: string[]) {
    records.value = newRecords;
  }

  return {
    photo,
    hasPhoto,
    displayImage,
    records,
    setPhoto,
    clearPhoto,
    setDisplayImage,
    setRecords,
  };
});
