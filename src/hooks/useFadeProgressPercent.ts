import { computed, onMounted } from "vue";
import { useCountdown } from "./useCountdown";

export function useFadeProgressPercent(duration: number) {
  const { time, start, reset } = useCountdown(duration);

  // 1 - e^(-5) = 0.9932620530009145
  const alpha = 5;

  const percent = computed(() => {
    return Math.floor(
      (1 - Math.exp((-alpha * (duration - time.value)) / duration)) * 100
    );
  });

  onMounted(() => {
    start();
  });

  return { percent, reset };
}
