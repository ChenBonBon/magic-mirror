import { onBeforeUnmount, onMounted, ref } from "vue";

export function useCountDown(leftTime: number, interval = 100) {
  const countdown = ref(leftTime);

  let timer: number;

  onMounted(() => {
    timer = setInterval(() => {
      if (countdown.value <= 0) {
        clearInterval(timer);

        countdown.value = 0;
      }

      countdown.value = countdown.value - interval;
    }, interval);
  });

  onBeforeUnmount(() => {
    clearInterval(timer);
  });

  return { countdown };
}
