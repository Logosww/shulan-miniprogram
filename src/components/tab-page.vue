<template>
  <div class="animation-fade-in" v-for="(item, index) in list" :key="index" v-show="item.shouldShow">
    <component :is="item.component" v-if="item.shouldRender" />
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { tabbarList } from '@/constants';

const props = defineProps<{
  activeTabName: string;
}>();

const list = tabbarList.map(({ pageComponent }) => ({ 
  component: pageComponent,
  shouldRender: false,
  shouldShow: false,
}));
list[0].shouldRender = list[0].shouldShow = true;

watch(
  () => props.activeTabName,
  (newName, oldName) => {
    const oldIndex = tabbarList.findIndex(({ name }) => name === oldName);
    const newIndex = tabbarList.findIndex(({ name }) => name === newName);
    list[oldIndex].shouldShow = false;
    list[newIndex].shouldShow = list[newIndex].shouldRender = true;
  }
);

</script>

<style lang="scss">
  @use '../assets/style/components/tab-page' as *;
</style>