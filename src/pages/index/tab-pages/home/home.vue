<template>
  <Container
    content-class="px-[16px] mt-[54px] overflow-y-scroll"
    :content-style="{ '--extra-top-fixed-height': '54px' }"
    :bg-style="{ backgroundColor: '#F4F4F4' }"
    :mask-style="{
      maskLeftWidth: 304,
      maskLeftHeight: 205,
      maskLeftTop: -54,
      maskLeftLeft: -109,
      maskRightWidth: 185.16,
      maskRightHeight: 185.16,
      maskRightTop: -29,
      maskRightRight: -87,
    }"
    background
    tabbar-page
  >
    <template #navbar-left><image class="h-full" src="@/assets/image/logo_home.png" mode="heightFix" /></template>
    <template #navbar-bottom>
      <div class="w-full h-[42px] pt-[4px] pb-[8px] px-[16px] left-0 flex items-center box-border">
        <div class="flex items-center" @tap="Taro.navigateTo({ url: '/packageB/pages/select-city/select-city' })">
          <image class="w-[16px] h-[16px] mr-[4px]" src="@/assets/icon/home/position.svg" :svg="true" />
          <div class="text-[#0D0F02] font-[500] text-[14px] leading-[20px] max-w-[48px] truncate">{{ store.city || '杭州' }}</div>
        </div>
        <div class="py-[7px] pl-[10px] flex ml-[16px] mr-[15px] bg-white border-[#8ECCA0] border-[1px] border-solid rounded-[20px] flex-[1]" @tap="Taro.navigateTo({ url: '/packageB/pages/search/search' })">
          <image class="w-[16px] h-[16px] mr-[12px]" src="@/assets/icon/home/search.svg" :svg="true" />
        </div>
        <image class="w-[20px] h-[20px]" src="@/assets/icon/home/notification.svg" :svg="true" @tap="Taro.showToast({ title: '功能暂未开放', icon: 'none' })" />
      </div>
    </template>
    <my-scroll-view
      :lowerThreshold="0"
      :height="contentHeight"
      :refresh-handler="() => fetchActivityList(1)"
      @scrolltolower="getMoreActivities()"
      refresher
    >
      <nut-swiper class="h-[150px] rounded-[8px] bg-white" :auto-play="3000" pagination-visible @change="index => currBannerIndex = index">
        <nut-swiper-item v-for="(banner, index) in bannerList" :key="index" @tap="handleBannerTap(banner)">
          <image class="w-full h-full" :src="banner.coverUrl" mode="aspectFill" />
        </nut-swiper-item>
        <template #page>
          <div class="absolute w-full h-[3px] left-0 bottom-[8px] flex justify-center items-center">
            <div :class="['swiper-indicator-item', currBannerIndex === index ? 'is-active' : '']" v-for="(_, index) in bannerList" :key="index"></div>
          </div>
        </template>
      </nut-swiper>
      <div class="pt-[13px] pb-[9px] px-[19px] my-[16px] bg-white rounded-[12px] flex justify-between">
        <div @tap="Taro.navigateTo({ url: `/packageB/pages/activity-list/activity-list?type=${ActivityType.concert}` })">
          <image class="w-[40px] h-[40px] mb-[4px]" src="@/assets/icon/home/concert.svg" :svg="true" />
          <div class="text-center text-black text-[14px] font-[500] leading-[16px]">演唱会</div>
        </div>
        <div @tap="Taro.navigateTo({ url: `/packageB/pages/activity-list/activity-list?type=${ActivityType.drama}` })">
          <image class="w-[40px] h-[40px] mb-[4px]" src="@/assets/icon/home/drama.svg" :svg="true" />
          <div class="text-center text-black text-[14px] font-[500] leading-[16px]">话剧</div>
        </div>
        <div @tap="Taro.navigateTo({ url: `/packageB/pages/activity-list/activity-list?type=${ActivityType.talkshow}` })">
          <image class="w-[40px] h-[40px] mb-[4px]" src="@/assets/icon/home/talkshow.svg" :svg="true" />
          <div class="text-center text-black text-[14px] font-[500] leading-[16px]">脱口秀</div>
        </div>
        <div @tap="Taro.navigateTo({ url: `/packageB/pages/activity-list/activity-list?type=${ActivityType.musicFesitival}` })">
          <image class="w-[40px] h-[40px] mb-[4px]" src="@/assets/icon/home/music_festival.svg" :svg="true" />
          <div class="text-center text-black text-[14px] font-[500] leading-[16px]">音乐节</div>
        </div>
        <div @tap="Taro.navigateTo({ url: `/packageB/pages/activity-list/activity-list?type=${ActivityType.sports}` })">
          <image class="w-[40px] h-[40px] mb-[4px]" src="@/assets/icon/home/sports.svg" :svg="true" />
          <div class="text-center text-black text-[14px] font-[500] leading-[16px]">体育</div>
        </div>
      </div>
      <div class="text-black text-[20px] mb-[10px] font-bold before:absolute">
        <text class="relative z-[1] before:absolute before:z-[-1] before:content-[''] before:h-[8px] before:w-full before:left-0 before:bottom-0 before:bg-[#51FE81] before:rounded-[12px]">热门活动</text>
      </div>
      <div class="space-y-[10px]" v-if="activityList.length">
        <ActivityCard
          v-for="(item, index) in activityList"
          :key="index"
          :data="item"
        />
        <div class="h-[50px]"></div>
      </div>
      <nut-empty description="暂无活动" v-else />
    </my-scroll-view>
  </Container>
  <Modal title="还不知道您在哪里" v-model="locationAuthModalVisible" :close-on-click-overlay="false" @close="store.showLocationAuthModal = !showLocationAuthModal">
    <div class="text-center text-[#0D0F02] text-[16px] leading-[19px] mb-[12px]">开启定位权限后，树懒将为您精准推荐附近的演出活动</div>
    <div class="text-center text-[#666666] text-[12px] leading-[14px]">点击设置-树懒，开启定位权限</div>
    <template #footer>
      <div class="flex justify-between px-[11px] mb-[16px]">
        <div class="px-[17px] py-[8px] text-[16px] leading-[19px] rounded-[8px] whitespace-nowrap bg-[#F2F2F2] text-[#404040] mr-[11px]" @tap="handleManuallySelectCity">手动选择城市</div>
        <div class="px-[17px] py-[8px] text-[16px] leading-[19px] rounded-[8px] whitespace-nowrap bg-[#50FE82] text-[#0D0F02]" @tap="handleAuthLocation">快速开启定位</div>
      </div>
      <div class="text-center">
        <nut-checkbox icon-size="12" v-model="showLocationAuthModal">
          <text class="text-[#B3B3B3] text-[12px] leading-[14px]">不再提醒</text>
        </nut-checkbox>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Taro, { useLoad } from '@tarojs/taro';
import { ref } from 'vue';
import { useStore } from '@/store';
import { useThrottleFn } from '@vueuse/core';
import { ActivityType, BannerType, bannerTypePathnameMap } from '@/constants';
import { useContentHeight, useGetPagingActivities, useDecodeGeography, useGetBannerList } from '@/composables';
import Container from '@/components/container.vue';
import Modal from '@/components/modal.vue';
import ActivityCard from '@/components/activity-card.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { IActivityPreview, IBanner } from '@/composables/use-api-types';

let current = 1;

const locationAuthModalVisible = ref(false);
const showLocationAuthModal = ref(false);
const currBannerIndex = ref(0);
const activityList = ref<IActivityPreview[]>([]);

const store = useStore();
const contentHeight = useContentHeight();

const bannerList = ref<IBanner[]>([]);

useGetBannerList().then(list => bannerList.value = list);

store.$onAction(({ name, args }) => name === 'selectCity' && fetchActivityList(1, args[0]));

const fetchActivityList = async (page?: number, city?: string) => {
  if(page) current = page;
  current !== 1 && Taro.showLoading({ title: '加载中' });
  const { records } = await useGetPagingActivities({ 
    size: 6,
    type: null,
    page: current,
    keyword: null,
    city: city ?? store.city ?? null,
  });
  current !== 1 && Taro.hideLoading();
  if(!records.length && current > 1) return;

  current === 1 ? (activityList.value = records) : activityList.value.push(...records);
  current++;
};

const getMoreActivities = useThrottleFn(fetchActivityList, 2000);

const handleManuallySelectCity = () => {
  locationAuthModalVisible.value = false;
  Taro.navigateTo({ url: '/packageB/pages/select-city/select-city' });
};

const handleAuthLocation = () => {
  locationAuthModalVisible.value = false;
  Taro.authorize({
      scope: 'scope.userFuzzyLocation',
    })
    .then(() => {
      Taro.getFuzzyLocation({
        type: 'gcj02',
        success: async params => store.selectCity(await useDecodeGeography(params)), 
      });
    })
    .catch(() => {
      Taro.showModal({ 
        title: '获取定位授权失败',
        content: '需要你手动设置地理位置授权',
        confirmText: '去开启',
        success({ confirm }) {
          confirm && Taro.openSetting();
        },
      });
    });
};

const handleBannerTap = (banner: IBanner) => {
  const { type, targetId } = banner;
  if(type === BannerType.none) return;
  if(type === BannerType.miniprogram) {
    const { 
      miniProgramAppid: appId,
      miniProgramPagePath: path,
    } = banner;

    return Taro.navigateToMiniProgram({
      appId,
      path
    });
  }

  const pathname = bannerTypePathnameMap[type]!;
  Taro.navigateTo({ url: `/pages/${pathname}/${pathname}?id=${targetId}` });
};

useLoad(() => {
  if(!store.showLocationAuthModal) return fetchActivityList();

  Taro.getSetting({
    success({ authSetting }) {
      if(authSetting['scope.userFuzzyLocation']) {
        Taro.getFuzzyLocation({
          type: 'gcj02',
          success: async params => {
            store.selectCity(await useDecodeGeography(params));
          }, 
          fail: () => fetchActivityList(),
        });

        return;
      }
      if((!authSetting['scope.userFuzzyLocation']) && store.showLocationAuthModal)
        locationAuthModalVisible.value = true;

      fetchActivityList();
    },
    fail: () => fetchActivityList(),
  });
});

</script>

<style lang="scss">
  @use './home' as *;
</style>