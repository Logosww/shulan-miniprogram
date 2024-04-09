<template>
  <ConfigProvider>
    <Container content-class="bg-[#F7F7F7]" navbar-title="树懒团队">
      <div class="bg-white h-full p-[16px] space-y-[32px] animation-fade-in" v-show="isLoading">
        <div>
          <nut-skeleton row="5" height="16px" width="398px" animated round />
        </div>
        <div>
          <nut-skeleton row="3" height="16px" width="398px" animated round />
        </div>
        <div>
          <nut-skeleton row="5" height="16px" width="398px" animated round />
        </div>
        <div>
          <nut-skeleton row="3" height="16px" width="398px" animated round />
        </div>
      </div>
      <div class="animation-fade-in" v-show="!isLoading">
        <div class="bg-white p-[16px]">
          <div class="text-[18px] text-[#0D0F02] font-bold leading-[21px]">视频标题视频标题视频标题视频标题视频标题视频视频标题视频标题视频标题视频标题视频标题视频</div>
          <div class="text-[#404040] my-[6px] text-[12px] leading-[14px]">杭州 |【演唱会】周杰伦</div>
          <div class="text-[#4040404] text-[12px] leading-[14px]">2024-01-11 13：30</div>
          <div class="flex justify-between mt-[16px]">
            <div class="flex items-center">
              <image class="w-[44px] h-[44px] mr-[10px] rounded-full flex-shrink-0" src="@/assets/image/logo_home.png" mode="aspectFit" />
              <div class="text-[#0D0F02] leading-[16px] font-[500]">树懒团队</div>
            </div>
            <div class="flex items-center">
              <image class="w-[22px] h-[22px] mr-[24px]" src="@/assets/icon/live-detail/share.svg" :svg="true" />
              <div class="flex items-center" @tap="handleToggleLike">
                <image class="w-[22px] h-[22px] mr-[4px]" :src="isLiked ? likeActiveSvg : likeSvg" :svg="true" />
                <div :class="['text-[12px] transition-colors', isLiked ? 'text-[#41CC68]' : 'text-[#666]']">440</div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-black text-[16px] leading-[19px] my-[16px] pl-[16px] font-bold before:absolute">
          <text class="relative z-[1] before:absolute before:z-[-1] before:content-[''] before:h-[8px] before:w-full before:left-0 before:bottom-0 before:bg-[#51FE81] before:rounded-[12px]">为你推荐</text>
        </div>
        <div class="bg-white px-[16px] py-[12px] flex justify-between">
          <div class="flex flex-col justify-between flex-[1]">
            <div class="text-[#0D0F02] font-[500] leading-[16px] line-clamp-2 text-ellipsis">视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题标题视频标题标题</div>
            <div class="text-[#404040] text-[12px] leading-[14px]">杭州 |【演唱会】周杰伦</div>
          </div>
          <div class="w-[72px] h-[64px] rounded-[4px] overflow-hidden flex-shrink-0 bg-slate-100"></div>
        </div>
        <div class="bg-white px-[16px] py-[12px] flex justify-between">
          <div class="flex flex-col justify-between flex-[1]">
            <div class="text-[#0D0F02] font-[500] leading-[16px] line-clamp-2 text-ellipsis">视频标题视频标题视频标题视频标题视频标题视频标题视频标题视频标题标题视频标题标题</div>
            <div class="text-[#404040] text-[12px] leading-[14px]">杭州 |【演唱会】周杰伦</div>
          </div>
          <div class="w-[72px] h-[64px] rounded-[4px] overflow-hidden flex-shrink-0 bg-slate-100"></div>
        </div>
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useReady } from '@tarojs/taro';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import likeSvg from '@/assets/icon/live-detail/like.svg';
import likeActiveSvg from '@/assets/icon/live-detail/like_active.svg';

const isLoading = ref(true);
const isLiked = ref(false);

const handleToggleLike = () => {
  isLiked.value = !isLiked.value;
};

useReady(() => setTimeout(() => isLoading.value = false, 600));

</script>

<style lang="scss">
  @use 'live-detail' as *;
</style>