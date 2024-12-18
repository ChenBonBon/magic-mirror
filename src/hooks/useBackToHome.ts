import { ref } from "vue";
import { useRouter } from "vue-router";

const backToHomeTimeConf = import.meta.env.VITE_BACK_TO_HOME_TIME;
let backToHomeTime = backToHomeTimeConf
  ? parseInt(backToHomeTimeConf, 10)
  : 60000;

export default function useBackToHome() {
  const router = useRouter();

  const startTime = ref(Date.now());

  let raf: number;

  const backToHome = () => {
    const current = Date.now();

    if (current - startTime.value > backToHomeTime) {
      router.push("/");
    } else {
      raf = requestAnimationFrame(backToHome);
    }
  };

  function start(time?: number) {
    startTime.value = Date.now();
    if (time) {
      backToHomeTime = time;
    }
    raf = requestAnimationFrame(backToHome);
  }

  function reset() {
    startTime.value = Date.now();
  }

  function clear() {
    if (raf) {
      cancelAnimationFrame(raf);
    }
  }

  return {
    start,
    reset,
    clear,
  };
}
