<template>
  <scroll-view
    type="custom"
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
    <slot v-if="$slots['default']"></slot>
    <sticky-section v-for="(item, index) in data" :key="index">
      <sticky-header>
        <div class="elevator-item__title" :id="item.title">{{ item.title }}</div>
      </sticky-header>
      <list-view :padding="[0, 0, 0, 16]">
        <block v-for="_item in item.list" :key="_item.key ?? _item.value" @tap="emit('select', _item.value)">
          <div class="elevator-item__content-item">{{ _item.label ?? _item.value }}</div>
        </block>
      </list-view>
    </sticky-section>
  </scroll-view>
  <root-portal>
    <div class="elevator-bar">
      <div class="elevator-bar__item" v-for="(item, index) in data" :key="index" @tap="currentIndex = item.title">{{ item.title }}</div>
    </div>
  </root-portal>
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