import { onBeforeUnmount, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../useAppStore";
import { useCountdown } from "./useCountdown";

const backToHomeTime = import.meta.env.VITE_BACK_TO_HOME_TIME;

export function useBackToHome() {
  const router = useRouter();

  const store = useAppStore();

  const { isTiming, start, reset, stop } = useCountdown(
    backToHomeTime ?? 60,
    () => {
      router.push("/");
    }
  );

  function handleReset() {
    reset();

    setTimeout(() => {
      start();
    }, 1000);
  }

  onMounted(() => {
    start();

    document.addEventListener("click", handleReset);
    document.addEventListener("mousemove", handleReset);
    document.addEventListener("touchstart", handleReset);
    document.addEventListener("touchmove", handleReset);
    document.addEventListener("keydown", handleReset);
    document.addEventListener("wheel", handleReset);
    document.addEventListener("mousewheel", handleReset);
    document.addEventListener("scroll", handleReset);
  });

  watchEffect(() => {
    if (isTiming.value && store.cuteLoading) {
      reset();
    } else {
      if (!isTiming.value && !store.cuteLoading) {
        start();
      }
    }
  });

  watchEffect(() => {
    if (isTiming.value && store.aiLoading) {
      reset();
    } else {
      if (!isTiming.value && !store.aiLoading) {
        start();
      }
    }
  });

  watchEffect(() => {
    if (isTiming.value && store.threeDLoading) {
      reset();
    } else {
      if (!isTiming.value && !store.threeDLoading) {
        start();
      }
    }
  });

  onBeforeUnmount(() => {
    stop();

    document.removeEventListener("click", handleReset);
    document.removeEventListener("mousemove", handleReset);
    document.removeEventListener("touchstart", handleReset);
    document.removeEventListener("touchmove", handleReset);
    document.removeEventListener("keydown", handleReset);
    document.removeEventListener("wheel", handleReset);
    document.removeEventListener("mousewheel", handleReset);
    document.removeEventListener("scroll", handleReset);
  });
}
