import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export interface ScreenSize {
  height: number;
  width: number;
}

export const useScreenSize = (): Ref<ScreenSize> => {
  const screenSize = ref<ScreenSize>({
    height: window.innerHeight,
    width: window.innerWidth
  });

  const updateScreenSize = (): void => {
    screenSize.value = {
      height: window.innerHeight,
      width: window.innerWidth
    };
  };

  onMounted(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
  });

  return screenSize;
};
