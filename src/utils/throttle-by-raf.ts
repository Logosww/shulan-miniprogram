import { useUnload } from '@tarojs/taro';

export const throttleByRaf = (callback: (...args: any[]) => void) => {
  let timer = 0;

  const throttle = (...args: any[]): void => {
    if(timer) cancelAnimationFrame(timer);
    timer = requestAnimationFrame(() => {
      callback(...args);
      timer = 0;
    })
  };

  throttle.cancel = () => {
    cancelAnimationFrame(timer);
    timer = 0;
  };

  useUnload(throttle.cancel);

  return throttle;
};