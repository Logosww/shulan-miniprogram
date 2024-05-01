<template>
  <div :class="['container', shouldDisableBg ? '' : 'is-bg', props.disableSafeBottom ? '' : 'is-safe-bottom']" :style="style">
    <div class="container-mask-left" v-if="background"></div>
    <div class="container-mask-right" v-if="background"></div>
    <nut-navbar 
        class="fixed top-0 w-full z-10"
        :title="navbarTitle"
        :style="{ '--nut-navbar-height': `${navbarHeight}px`, paddingTop: `${statusBarHeight}px` }"
        :left-show="isShowBackBtn"
        :placeholder="false"
        @click-back="Taro.navigateBack()"
      >
      <template #left-show>
        <image class="w-[9px] h-[17px]" src="@/assets/icon/left.svg" :svg="true" />
      </template>
      <template #left v-if="$slots['navbar-left']">
        <slot name="navbar-left"></slot>
      </template>
    </nut-navbar>
    <div class="fixed w-full z-10" :style="{ top: `${navbarHeight + statusBarHeight!}px` }" v-if="$slots['navbar-bottom']"><slot name="navbar-bottom"></slot></div>
    <div :class="['container-content', props.tabbarPage ? 'is-tabbar-page' : '', contentClass]" :style="contentStyle" :id="contentId"><slot></slot></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Taro, { useLoad } from '@tarojs/taro';

import type { CSSProperties } from 'vue';

interface IMaskStyles {
  bgEndColorPosition?: string;
  maskLeftWidth?: number;
  maskLeftHeight?: number;
  maskLeftTop?: number;
  maskLeftLeft?: number;
  maskRightWidth?: number;
  maskRightHeight?: number;
  maskRightTop?: number;
  maskRightRight?: number;
}

const props = defineProps<{
  navbarTitle?: string;
  background?: boolean;
  disableSafeBottom?: boolean;
  maskStyle?: IMaskStyles;
  contentId?: string;
  contentStyle?: CSSProperties;
  bgStyle?: CSSProperties;
  tabbarPage?: boolean;
  contentClass?: string;
}>();

const { top: menuButtonTop, height: menuButtonHeight } = Taro.getMenuButtonBoundingClientRect();
const { statusBarHeight } = Taro.getSystemInfoSync();
const navbarHeight = menuButtonHeight + (menuButtonTop - statusBarHeight!) * 2;

const isShowBackBtn = ref(false);

const shouldDisableBg = computed(() => props.bgStyle || !props.background);

const maskStyle = computed<Record<string, string> | null>(() => {
  if(props.maskStyle) {
    const _maskStyles = {};
    Object.entries(props.maskStyle).forEach(([prop, value]) => {
      const _prop = `--${prop.replace(/([a-z])([A-Z])/g, (_, c1: string, c2: string) => `${c1}-${c2.toLowerCase()}`)}`;
      if(typeof value === 'string') _maskStyles[_prop] = `${value}%`;
      else if(typeof value === 'number') _maskStyles[_prop] = `${value}px`;
    });
    return _maskStyles;
  } else return null;
});

const style = computed(() => {
  const paddingTop = `${statusBarHeight! + navbarHeight}px`;
  const { bgStyle, background } = props;
  return {
    paddingTop,
    ...bgStyle,
    ...(background ? maskStyle.value : {}),
  };
});

useLoad(() => {
  isShowBackBtn.value = Taro.getCurrentPages().length > 1;
});

</script>

<style lang="scss">
@use '../assets/style/components/container' as *;
</style>