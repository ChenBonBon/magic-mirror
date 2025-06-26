import { onMounted } from "vue";

export default function () {
  let lastTouchEnd = 0;

  function handleTouchStart(event: TouchEvent) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }

  onMounted(() => {
    // 阻止双击放大
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
      capture: false,
    });

    document.addEventListener("touchend", handleTouchEnd, {
      passive: false,
      capture: false,
    });
  });
}
