<template>
  <Container content-id="live-content" navbar-title="现场回顾" tabbar-page>
    <FilterMenu :config="liveFilterConfig" @change="handleFilter" />
    <scroll-view
      class="box-border p-[16px] bg-[#F7F7F7]"
      :style="scrollViewStyle"
      :enhanced="true"
      :enable-passive="true"
      :scroll-y="true"
      :show-scrollbar="false"
      :fast-deceleration="true"
      :scroll-with-animation="true"
      :using-sticky="true"
      @scrolltolower="getMoreActivities()"
    >
      <div class="space-y-[12px]" v-if="liveList.length">
        <div
          class="bg-white rounded-[12px] pb-[16px] relative overflow-hidden"
          v-for="(item, index) in liveList"
          :key="index"
          @tap="Taro.navigateTo({ url: `/pages/live-detail/live-detail?id=${item.id}` })"
        >
          <div class="h-[135px] bg-slate-200 mb-[12px]">
            <image class="w-full h-full" mode="aspectFill" :src="item.coverUrl" />
          </div>
          <div class="relative px-[12px]">
            <div class="text-[#0D0F02] font-bold leading-[16px]">{{ item.title }}</div>
            <div class="text-[#404040] text-[12px] font-[500] leading-[14px] my-[6px] line-clamp-3 text-ellipsis">{{ item.digest }}</div>
            <div class="text-[#666] text-[12px] leading-[16px] truncate">{{ item.activity.city }} |【{{ activityTypeMap[item.activity.type] }}】{{ item.activity.name }}</div>
          </div>
          <div class="absolute right-0 top-[12px] bg-[#51FE81] text-[#0D0F02] font-[500] leading-[18px] px-[18px] py-[2px] rounded-l-[4px]">{{ activityTypeMap[item.activity.type] }}</div>
        </div>
      </div>
      <nut-empty description="暂无现场回顾" v-else />
    </scroll-view>
  </Container>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useThrottleFn } from '@vueuse/core';
import { liveFilterConfig, activityTypeMap } from '@/constants';
import { useContentHeight, useGetPagingLives } from '@/composables';
import Taro from '@tarojs/taro';
import Container from '@/components/container.vue';
import FilterMenu from '@/components/filter-menu.vue';

import type { ActivityType } from '@/constants';
import type { ILive } from '@/composables/use-api-types';

type FetchParams = {
  city?: string;
  keyword?: string;
  type?: ActivityType;
  activityAt?: [string, string];
};

let current = 1, fetchParams: FetchParams = {};

const liveList = ref<ILive[]>([]);

const contentHeight = useContentHeight();
const scrollViewStyle = computed(() => ({ height: `${contentHeight.value - 48}px` }));

const fetchLiveList = async (page?: number) => {
  const { city, type, activityAt, keyword } = fetchParams;
  if(page) current = page;
  Taro.showLoading({ title: '加载中' });
  const { records } = await useGetPagingLives({ 
    size: 6,
    page: current,
    city: city ?? null,
    activityType: type ?? null,
    activityAt: activityAt ?? null,
    keyword: keyword ?? null,
  });
  Taro.hideLoading();
  if(!records.length && current > 1) return;

  current === 1 ? (liveList.value = records) : liveList.value.push(...records);
  current++;
};

const getMoreActivities = useThrottleFn(fetchLiveList, 2000);

const handleFilter = (values : FetchParams) => (fetchParams = values) && fetchLiveList(1);

onMounted(fetchLiveList);

</script>