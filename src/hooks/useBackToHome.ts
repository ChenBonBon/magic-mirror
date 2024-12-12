import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCountdown } from "./useCountdown";

const backToHomeTime = import.meta.env.VITE_BACK_TO_HOME_TIME;

export function useBackToHome() {
  const router = useRouter();

  const { time, start, reset, stop } = useCountdown(
    parseInt(backToHomeTime, 10) ?? 60,
    () => {
      router.push("/");
    }
  );

  const forceWait = ref(false);

  function handleReset() {
    reset();

    setTimeout(() => {
      if (forceWait.value) {
        return;
      }

      start();
    }, 1000);
  }

  function forceReset() {
    forceWait.value = true;
    reset();
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

  watch(time, (val) => {
    console.log(val);
  });

  return {
    start,
    forceReset,
  };
}
