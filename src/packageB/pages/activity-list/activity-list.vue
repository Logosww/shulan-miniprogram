<template>
  <ConfigProvider>
    <Container navbar-title="热门活动" disable-safe-bottom>
      <FilterMenu ref="filterMenuRef" :config="activityFilterConfig" @change="handleFilter" />
      <my-scroll-view
        class="box-border px-[16px] pt-[12px] bg-[#F7F7F7]"
        :height="contentHeight - 48"
        :refresh-handler="() => fetchActivityList(1)"
        @scrolltolower="getMoreActivities()"
        refresher
      >
        <div class="space-y-[16px]" v-if="activityList.length">
          <ActivityCard v-for="(item, index) in activityList" :key="index" :data="item" />
        </div>
        <nut-empty description="暂无活动" v-else />
        <div class="h-[16px]"></div>
      </my-scroll-view>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import Taro, { useLoad } from '@tarojs/taro';
import { useThrottleFn } from '@vueuse/core';
import { IActivityPreview, useContentHeight, useSearchPagingActivities } from '@/composables';
import { activityFilterConfig } from '@/constants';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import FilterMenu from '@/components/filter-menu.vue';
import ActivityCard from '@/components/activity-card.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { ActivityType } from '@/constants/value-enum';

type FetchParams = {
  city?: string;
  type: ActivityType;
  activityAt?: [string, string];
};

let current = 1, fetchParams: FetchParams;

const activityList = ref<IActivityPreview[]>([]);
const filterMenuRef = shallowRef<InstanceType<typeof FilterMenu>>();

const contentHeight = useContentHeight();

const fetchActivityList = async (page?: number) => {
  const { city, type, activityAt } = fetchParams;
  if(page) current = page;
  current !== 1 && Taro.showLoading({ title: '加载中' });
  const { records } = await useSearchPagingActivities({ 
    type,
    size: 6,
    page: current,
    city: city ?? null,
    activityAt: activityAt ?? null,
  });
  current !== 1 && Taro.hideLoading();
  if(!records.length && current > 1) return;

  current === 1 ? (activityList.value = records) : activityList.value.push(...records);
  current++;
};

const getMoreActivities = useThrottleFn(fetchActivityList, 2000);

const handleFilter = (values : FetchParams) => (fetchParams = values) && fetchActivityList(1);

useLoad<{ type?: string }>(async ({ type: _type }) => {
  const type = (parseInt(_type ?? '') || 0) as ActivityType;
  filterMenuRef.value?.setFilterOption('type', type);
  filterMenuRef.value?.$forceUpdate();
  fetchParams = { type };
  fetchActivityList();
});

</script>

<style lang="scss">
  @use 'activity-list' as *;
</style>