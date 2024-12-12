import { onUnmounted, ref, unref } from "vue";

export function useCountdown(duration: number, onCountdownEnd?: () => void) {
  const time = ref(duration);
  const isTiming = ref(false);
  const timer = ref<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  };

  const stop = () => {
    clear();
    isTiming.value = false;
  };

  const reset = () => {
    stop();
    time.value = duration;
  };

  const start = () => {
    if (unref(isTiming) || !!timer.value) {
      return;
    }
    isTiming.value = true;
    timer.value = setInterval(() => {
      if (unref(time) <= 0) {
        reset();
        console.log("countdown end", time);
        onCountdownEnd && onCountdownEnd();
      } else {
        time.value--;
      }
    }, 1000);
  };

  onUnmounted(() => {
    reset();
  });

  return { time, isTiming, start, stop, reset };
}
