import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCountdown } from "./useCountdown";

export function useBackToHome(backToHomeTime: number) {
  const router = useRouter();

  const { start, reset, stop } = useCountdown(backToHomeTime ?? 60, () => {
    router.push("/");
  });

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

  function forceStop() {
    forceWait.value = true;
    stop();
  }

  function handleStart() {
    forceWait.value = false;
    start();
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

  return {
    start: handleStart,
    stop: forceStop,
  };
}
