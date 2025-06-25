import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("global", () => {
  const photo = ref<Blob>();
  const count = ref(0);

  function setPhoto(data: Blob) {
    photo.value = data;
  }

  function setCount(data: number) {
    count.value = data;
  }

  return { photo, count, setPhoto, setCount };
});
