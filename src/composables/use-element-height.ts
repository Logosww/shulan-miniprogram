import { ref, onMounted } from 'vue';
import Taro, { useReady } from '@tarojs/taro';

import { BoundingClientRectCallbackResult } from '@babel/core';

interface IUseElementHeightOption {
  selector: string;
  onMounted?: boolean;
  defaultHeight?: number;
  heightGetter?: () => void;
};

type UseElementHeightOption = string | IUseElementHeightOption;

export const useElementHeight = (option: UseElementHeightOption) => {
  const elHeight = ref(1000);
  const selector = typeof option === 'string' ? option : option.selector;

  const getElementHeight = (option as IUseElementHeightOption).heightGetter ?? (() => Taro.nextTick(() => {
    Taro.createSelectorQuery()
      .select(selector)
      .boundingClientRect(({ height }: BoundingClientRectCallbackResult) => elHeight.value = height)
      .exec();
  }));

  useReady(getElementHeight);
  (option as IUseElementHeightOption).onMounted && onMounted(getElementHeight);

  return elHeight;
};

export const useContentHeight = () => useElementHeight('.container-content');