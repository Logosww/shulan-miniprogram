<template>
  <nut-popup
    transition="modal"
    pop-class="confirm-modal-wrapper"
    :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, .6)', backdropFilter: 'blur(2px)' }" 
    v-model:visible="modalVisible"
    :close-on-click-overlay="closeOnClickOverlay"
    :destroy-on-close="false"
  >
    <div class="confirm-modal-title" v-if="title">{{ title }}</div>
    <div class="confirm-modal-body">
      <slot></slot>
    </div>
    <div class="confirm-modal-footer">
      <div class="confirm-modal-btn" @tap="handleCancel" v-if="!justNotify">{{ cancelBtnTitle ?? '取消' }}</div>
      <div class="confirm-modal-btn is-primary" @tap="handleConfirm">{{ confirmBtnTitle ?? '确认' }}</div>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  title?: string;
  confirmBtnTitle?: string;
  cancelBtnTitle?: string;
  closeOnClickOverlay?: boolean;
  justNotify?: boolean;
}>(), { closeOnClickOverlay: false });

const modalVisible = defineModel<boolean>({ required: true, default: false });
const emit = defineEmits(['cancel', 'confirm']);

const handleCancel = () => {
  modalVisible.value = false;
  emit('cancel');
};

const handleConfirm = () => {
  modalVisible.value = false;
  emit('confirm');
};
</script>

<style lang="scss">
  @use '../assets/style/components/confirm-modal' as *;
</style>