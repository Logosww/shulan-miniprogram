<template>
  <div class="anchor">
    <div 
      class="anchor-link"
      v-for="(item, index) in config"
      :key="index"
    >
      <text :class="['anchor-link__title', currentAnchorIndex === index ? 'is-active' : '']" @tap="emit('scrollTo', item.id)">{{ item.title }}</text>    
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Taro, { useUnload } from '@tarojs/taro';
import { useElementHeight } from '@/composables';

import type { BoundingClientRectCallbackResult } from '@babel/core';

export interface IAnchorItemConfig {
  id: string;
  title: string;
};

const props = defineProps<{ config: IAnchorItemConfig[]; container: string; }>();
const emit = defineEmits<{ scrollTo: [id: string] }>();
const ids = props.config.map(({ id }) => `#${id}`);

const currentAnchorIndex = ref(0);

const anchorHeight = useElementHeight('.anchor');

let containerTop: number;

const throttleByRaf = (callback: (...args: any[]) => void) => {
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

const scrollHandler = throttleByRaf(() => {
  let index: number;
  const offsets: number[] = [];
  const query = Taro.createSelectorQuery();
  for(let id of ids) {
    query
      .select(id)
      .boundingClientRect(({ top }: BoundingClientRectCallbackResult) => offsets.push(top - containerTop - anchorHeight.value / 2))
  }
  query.exec(() => {
    for(let i = 0; i < offsets.length; i++) {
      if(offsets[i] > 0) {
        index = i - 1 < 0 ? 0 : i - 1;
        break;
      }
    }
    currentAnchorIndex.value = index ?? offsets.length - 1;
  });
});

useElementHeight({
  selector: props.container,
  onMounted: true,
  heightGetter() {
    if(typeof containerTop === 'undefined') {
      Taro.nextTick(() => {
        Taro.createSelectorQuery()
          .select(props.container)
          .boundingClientRect(({ top }: BoundingClientRectCallbackResult) => containerTop = top)
          .exec();
      });
    }
  }
});

defineExpose({ scrollHandler });

</script>

<style lang="scss">
  @use '../assets/style/components/anchor' as *;
</style>