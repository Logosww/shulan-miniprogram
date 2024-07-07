<template>
  <div class="relative" @tap="navigateTo({ url: '/packageB/pages/notification/notification' })">
    <image :style="{ width: `${size}px`, height: `${size}px` }" src="@/assets/icon/home/notification.svg" mode="aspectFit" :svg="true" />
    <div class="absolute top-[-3px] right-[-4px] bg-[#e84118] rounded-[19px] px-[3px] font-bold text-white text-[9px] leading-[11px]" v-if="store.notificationCount">
      <div class="absolute top-0 left-0 right-0 bottom-0 bg-[#f87263] opacity-75 rounded-[19px] animate-ping"></div>
      {{ store.notificationCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '@tarojs/taro';
import { useStore } from '@/store';

withDefaults(defineProps<{ size?: number }>(), { size: 20 });
const store = useStore();

</script>
