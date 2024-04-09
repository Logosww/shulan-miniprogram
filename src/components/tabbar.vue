<template>
  <a></a>
  <nut-tabbar v-model="activeTabName" unactive-color="#262626" active-color="#262626" bottom placeholder safe-area-inset-bottom @tab-switch="handleTabSwitch">
    <nut-tabbar-item class="flex h-full text-center items-center flex-[1]" v-for="(item, index) in tabbarList" :key="index" :name="item.name" :tab-title="item.title">
      <template #icon="{ active }">
        <image class="tabbar-item-icon" :src="active ? item.activeIcon : item.icon" :svg="true" />
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script lang="ts" setup>
import { tabbarList } from '@/constants';

const activeTabName = defineModel<string>('current', { required: true });

const handleTabSwitch = async (_, tabName: string) => activeTabName.value = tabName;

</script>

<style lang="scss">
  .nut-tabbar {
    box-shadow: 0px -4px 24px 6px rgba(128,128,128,0.05);

    .nut-tabbar-item_icon-box {
      padding-top: 12px;

      .tabbar-item-icon {
        width: 28px;
        height: 28px; 
      }
    }

    .nut-tabbar-item_icon-box_nav-word {
      font-weight: 500;
    }

    &.nut-tabbar-safebottom {
      padding-bottom: 16px;
    }
}
</style>