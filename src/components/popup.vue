<template>
  <nut-popup
    position="bottom"
    pop-class="px-[16px] pt-[16px] bg-white box-border"
    v-model:visible="popupVisible"
    :style="popStyle"
    :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, .6)' }"
    :destroy-on-close="destroyOnClose"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    @open="!rendered && (rendered = true)"
    @close="handleClose"
    round
  >
    <div class="popup-container" v-if="rendered">
      <div class="text-[#0D0F02] text-[20px] leading-[28px] font-bold relative text-center mb-[12px]">
        {{ title }}
        <image class="absolute w-[24px] h-[24px] right-0 my-[2px]" src="@/assets/icon/popup_close.svg" :svg="true" @tap="popupVisible = false" />
      </div>
      <my-scroll-view
        class="popup-content"
        :height="contentHeight"
        v-if="contentHeight"
      >
        <slot></slot>
      </my-scroll-view>
      <div class="popup-content" v-else>
        <slot></slot>
      </div>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useLoad, nextTick } from '@tarojs/taro';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { CSSProperties } from 'vue';

const props = withDefaults(defineProps<{
  title: string;
  closeIcon?: boolean;
  contentHeight?: number;
  safeAreaInsetBottom?: boolean;
  destroyOnClose?: boolean;
  popStyle?: CSSProperties
}>(), { closeIcon: true, safeAreaInsetBottom: true, destroyOnClose: false });

const emit = defineEmits(['close']);

const popupVisible = defineModel<boolean>({ required: true, default: false });

const rendered = ref(false);

const handleClose = () => {
  emit('close');
  nextTick(() => props.destroyOnClose && (rendered.value = false));
};

useLoad(() => popupVisible.value && (rendered.value = true));
</script>

<style lang="scss">
  @use '../assets/style/components/popup' as *;
</style>