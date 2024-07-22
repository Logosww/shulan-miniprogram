<template>
  <ConfigProvider>
    <Container navbar-title="消息详情" content-class="bg-[#F5F5F5]" disable-safe-bottom>
      <my-scroll-view class="px-[16px]" :height="height">
        <div class="mt-[32px] text-[#999] text-center text-[10px] leading-[9px] mb-[12px]">{{ data?.createAt }}</div>
        <div class="flex items-start pr-[20px] mb-[32px]">
          <div class="w-[44px] h-[44px] border border-[#41CC68] border-solid mr-[12px] flex-shrink-0 relative rounded-full overflow-hidden">
            <image class="w-full h-full" mode="aspectFill" :src="data?.coverUrl" :fade-in="true" />
          </div>
          <div class="bg-white p-[16px] rounded-[8px] flex-auto relative">
            <div class="text-[#0D0F00] text-[15px] leading-[20px] font-bold mb-[12px]">{{ data?.title }}</div>
            <rich-text :nodes="data?.content" :user-select="true" />
          </div>
        </div>
      </my-scroll-view>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Taro, { useLoad } from '@tarojs/taro';
import { useContentHeight } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { INotificationDetail } from '@/composables';

const data = ref<INotificationDetail>();
const height = useContentHeight();

useLoad(() => {
  const { preloadData } = Taro.getCurrentInstance();
  if(!preloadData) return;

  const { notificationDetail } = preloadData as { notificationDetail: INotificationDetail };
  notificationDetail.content = 
    notificationDetail.content.replace(/(\d+)px/g, (_, size) => `${size * 2}rpx`)
    .replace(/<img/g, '<img class="slate-image"');
  data.value = notificationDetail;
});

</script>

<style lang="scss">
  @use 'notification-detail' as *;
</style>