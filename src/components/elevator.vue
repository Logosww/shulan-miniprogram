<template>
  <scroll-view
    class="elevator-container" 
    :enhanced="true"
    :enable-passive="true"
    :scroll-y="true"
    :scroll-into-view="currentIndex"
    :show-scrollbar="false"
    :scroll-with-animation="true"
    :fast-deceleration="true"
    :scroll-anchoring="true"
    :using-sticky="true"
  >
    <div class="elevator-extra" v-if="$slots['default']">
      <slot></slot>
    </div>
    <div class="elevator-item" v-for="(item, index) in data" :key="index" :id="item.title">
      <div class="elevator-item__title">{{ item.title }}</div>
      <div class="elevator-item__content">
        <div class="elevator-item__content-item" v-for="_item in item.list" :key="_item.key ?? _item.value" @tap="emit('select', _item.value)">{{ _item.label ?? _item.value }}</div>
      </div>
    </div>
  </scroll-view>
  <div class="elevator-bar">
    <div class="elevator-bar__item" v-for="(item, index) in data" :key="index" @tap="currentIndex = item.title">{{ item.title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

export interface IElevatorDataItem {
  title: string;
  list: ({
    label?: string;
    value: number | string;
    key?: number | string | symbol; 
  })[];
};

defineProps<{
  data: IElevatorDataItem[];
}>();
const emit = defineEmits<{ select: [value: unknown] }>();

const currentIndex = ref();
</script>

<style lang="scss">
  @use '../assets/style/components/elevator' as *;
</style>