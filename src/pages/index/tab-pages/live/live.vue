<template>
  <Container content-id="live-content" :bg-style="{ backgroundColor: '#F4F4F4' }" content-class="flex items-center justify-center" tabbar-page>
    <nut-empty image="error" description="功能暂未开放" />
    <!-- <div class="flex py-[8px] px-[16px] items-center">
      <div class="h-[30px] py-[7px] pl-[10px] mr-[16px] box-border flex items-center bg-white border-[#8ECCA0] border-[1px] border-solid rounded-[20px] flex-[1]">
        <image class="w-[16px] h-[16px] mr-[12px] flex-shrink-0" src="@/assets/icon/home/search.svg" :svg="true" />
        <div class="flex-[1] text-[12px] leading-[16px] h-[16px] text-[#7DB28C] bg-transparent relative">
          <input type="text" class="border-0 outline-none h-full min-h-[unset]" v-model="searchContent" @focus="isSearchboxFocus = true" @blur="isSearchboxFocus  = false">
          <div class="absolute left-0 top-0 w-full h-full" v-show="!searchContent && !isSearchboxFocus">话剧</div>
        </div>
      </div>
      <div class="flex-shrink-0 relative">
        <image class="w-[20px] h-[20px]" src="@/assets/icon/home/notification.svg" :svg="true" />
      </div>
    </div>
    <FilterMenu :config="liveFilterConfig" @change="handleFilterChange" />
    <div class="live-list space-y-[12px]">
      <div class="bg-white rounded-[12px] pb-[16px] relative overflow-hidden" @tap="Taro.navigateTo({ url: '/pages/live-detail/live-detail' })">
        <div class="h-[135px] bg-slate-200 mb-[12px]"></div>
        <div class="relative px-[12px]">
          <div class="text-[#0D0F02] font-bold leading-[16px]">夏川里美 2024 巡回演唱会出道 25 周年杭州纪念专场</div>
          <div class="text-[#404040] text-[12px] font-[500] leading-[14px] my-[6px]">视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案</div>
          <div class="text-[#666] text-[12px] leading-[16px]">杭州 |【话剧】《杀死马克吐温》</div>
          <image class="w-[4px] h-[20px] absolute right-[12px] bottom-0" src="@/assets/icon/live/ellipsis.svg" :svg="true" />
        </div>
        <div class="absolute right-0 top-[12px] bg-[#51FE81] text-[#0D0F02] font-[500] leading-[18px] px-[18px] py-[2px] rounded-l-[4px]">话剧</div>
      </div>
      <div class="bg-white rounded-[12px] pb-[16px] relative overflow-hidden">
        <div class="h-[135px] bg-slate-200 mb-[12px]"></div>
        <div class="relative px-[12px]">
          <div class="text-[#0D0F02] font-bold leading-[16px]">夏川里美 2024 巡回演唱会出道 25 周年杭州纪念专场</div>
          <div class="text-[#404040] text-[12px] font-[500] leading-[14px] my-[6px]">视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案视频文案</div>
          <div class="text-[#666] text-[12px] leading-[16px]">杭州 |【话剧】《杀死马克吐温》</div>
          <image class="w-[4px] h-[20px] absolute right-[12px] bottom-0" src="@/assets/icon/live/ellipsis.svg" :svg="true" />
        </div>
        <div class="absolute right-0 top-[12px] bg-[#51FE81] text-[#0D0F02] font-[500] leading-[18px] px-[18px] py-[2px] rounded-l-[4px]">话剧</div>
      </div>
    </div> -->
  </Container>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
// import { liveFilterConfig } from '@/constants';
// import Taro from '@tarojs/taro';
import Container from '@/components/container.vue';
// import FilterMenu from '@/components/filter-menu.vue';

// const isSearchboxFocus = ref(false);
// const searchContent = ref('');

// const handleFilterChange = (val) => {
//   console.log(val)
// };
</script>

<style lang="scss">
  @use 'live' as *;
</style>