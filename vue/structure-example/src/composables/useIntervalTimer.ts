import { onMounted, onUnmounted } from 'vue';

export interface IntervalTimerCallback {
  (): Promise<boolean> | boolean;
}

export const useIntervalTimer = (
  timerTickCallback: IntervalTimerCallback,
  intervalMs: number
): void => {
  let timerHandle: number | undefined;
  let isTicking = false;

  const stopTimer = (): void => {
    if (timerHandle === undefined) {
      return;
    }

    window.clearInterval(timerHandle);
    timerHandle = undefined;
  };

  const tick = async (): Promise<void> => {
    if (isTicking) {
      return;
    }

    isTicking = true;

    try {
      const continueTimer = await timerTickCallback();

      if (!continueTimer) {
        stopTimer();
      }
    } finally {
      isTicking = false;
    }
  };

  onMounted(() => {
    timerHandle = window.setInterval(() => {
      void tick();
    }, intervalMs);
  });

  onUnmounted(() => {
    stopTimer();
  });
};
