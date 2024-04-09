<template>
  <nut-popup
    transition="modal"
    style="background-color: transparent; overflow: visible;"
    :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, .6)' }"
    v-model:visible="modalVisible"
    :close-on-click-overlay="closeOnClickOverlay"
    :destroy-on-close="destroyOnClose"
    @open="!rendered && (rendered = true)"
    @close="handleClose"
  >
    <div :class="['modal-wrapper', wrapperClass ?? '']" :style="wrapperStyle" v-if="rendered">
      <div class="modal-title" v-if="title && !$slots['title']">{{ title }}</div>
      <slot name="title" v-if="$slots['title']"></slot>
      <slot></slot>
      <div class="modal-footer" v-if="$slots['footer']">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="modal-close-btn" v-if="rendered">
      <image class="w-[40px] h-[40px]" src="@/assets/icon/close.svg" :svg="true" @tap="modalVisible = false" />
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { nextTick } from '@tarojs/taro';

import type { CSSProperties } from 'vue';

const props = withDefaults(defineProps<{
  title?: string;
  closeBtn?: boolean;
  wrapperClass?: string;
  bodyClass?: string;
  wrapperStyle?: CSSProperties;
  closeOnClickOverlay?: boolean;
  destroyOnClose?: boolean;
}>(), { closeBtn: true, closeOnClickOverlay: true, destroyOnClose: true });

const emit = defineEmits(['close']);

const modalVisible = defineModel<boolean>({ required: true, default: false });

const rendered = ref(false);

const handleClose = () => {
  emit('close');
  nextTick(() => props.destroyOnClose && (rendered.value = false));
};

watchEffect(() => modalVisible.value && (rendered.value = true))
</script>

<style lang="scss">
  @use '../assets/style/components/modal' as *;
</style>