import { computed } from "vue";
import { useCountDown } from "./useCountdown";

export function useFadeProgressPercent(duration: number) {
  const { countdown } = useCountDown(duration);

  // 1 - e^(-5) = 0.9932620530009145
  const alpha = 5;

  const percent = computed(() => {
    return Math.floor(
      (1 - Math.exp((-alpha * (duration - countdown.value)) / duration)) * 100
    );
  });

  return {percent};
}
