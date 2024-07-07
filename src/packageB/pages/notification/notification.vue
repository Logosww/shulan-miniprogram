<template>
  <ConfigProvider>
    <Container navbar-title="消息通知" content-class="bg-[#F7F7F7] pt-[12px]" disable-safe-bottom>
        <my-scroll-view
          :height="contentHeight"
          :refresh-handler="() => fetchNotificationList(1)"
          @scrolltolower="fetchNotificationList()"
          refresher
        >
          <div class="bg-white px-[16px]">
            <div class="notification-item__wrapper" v-for="(item, index) in notificationList" :key="index">
              <open-container @tap="handleToNotificationDetail(item, index)">
                <div class="notification-item">
                  <image class="notification-item__avatar" :src="item.coverUrl" :fade-in="true" />
                  <div class="notification-item__content">
                    <div class="notification-item__content-top">
                      <text :class="['notification-item__title', item.readState === NotificationState.read ? 'is-read' : '']" overflow="ellipsis">{{ item.title }}</text>
                      <div class="notification-item__time">{{ item.createAt }}</div>
                    </div>
                    <div class="flex items-center justify-between">
                      <text class="notification-item__content-bottom" overflow="ellipsis">{{ item.digest }}</text>
                      <div class="bg-[#e84118] rounded-[19px] w-[14px] text-center text-[10px] leading-[14px] text-white text-bold flex-shrink-0 mr-[4px]" v-if="item.readState === NotificationState.unread">1</div>
                    </div>
                  </div>
                </div>
              </open-container>
            </div>
          </div>
        </my-scroll-view>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { useThrottleFn } from '@vueuse/core';
import { useContentHeight, useGetNotificationDetail, useGetPagingNotifications, useReadNotification } from '@/composables';
import { NotificationState } from '@/constants/value-enum';
import { useStore } from '@/store';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { INotification } from '@/composables/use-api-types';

let current = 1;

const notificationList = ref<INotification[]>([]);

const contentHeight = useContentHeight();
const store = useStore();

const fetchNotificationList = useThrottleFn(async (page?: number) => {
  if(page) current = page;
  current !== 1 && Taro.showLoading({ title: '加载中' });
  const { records } = await useGetPagingNotifications({ 
    size: 12,
    page: current,
  });
  current !== 1 && Taro.hideLoading();
  if(!records.length && current > 1) return;

  current === 1 ? (notificationList.value = records) : notificationList.value.push(...records);
  console.log(current, notificationList.value)
  current++;
}, 2000);

const handleToNotificationDetail = async ({ id, readState, createAt }: INotification, index: number) => {
  Taro.showLoading({ title: '加载中' });
  if(readState === NotificationState.unread) {
    await useReadNotification({ id }).then(store.readNotification);
    notificationList.value[index].readState = NotificationState.read;
  }
  const notificationDetail = await useGetNotificationDetail({ id });
  notificationDetail.createAt = createAt;
  Taro.preload({ notificationDetail });
  Taro.hideLoading();
  Taro.navigateTo({ url: '/packageB/pages/notification-detail/notification-detail' });
};

onMounted(fetchNotificationList);

</script>

<style lang="scss">
  @use 'notification' as *;
</style>