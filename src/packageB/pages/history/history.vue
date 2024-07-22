<template>
  <ConfigProvider>
    <Container navbar-title="活动纪念" content-class="pt-[16px] px-[16px]" :bg-style="{ backgroundColor: '#F7F7F7' }" background>
      <my-scroll-view class="space-y-[16px]" :height="height" v-if="history.length">
        <div class="history-item-year" v-for="(yearItem, yearIndex) in history" :key="yearIndex">
          <div class="history-item-year__title" @tap="yearItemCollapsedMap[yearIndex] = !yearItemCollapsedMap[yearIndex]">
            {{ yearItem.year }} 年
            <image class="history-item-year__arrow-icon" :class="yearItemCollapsedMap[yearIndex] ? 'is-collapsed' : ''" src="@/assets/icon/history/arrow.svg" mode="aspectFit" :svg="true" />
          </div>
          <div class="space-y-[8px]" v-show="!yearItemCollapsedMap[yearIndex]">
            <div class="history-item-month" v-for="(monthItem, monthIndex) in yearItem.records" :key="monthIndex">
              <div class="history-item-month__title">{{ monthItem.month }} 月</div>
              <div class="space-y-[8px]">
                <div class="rounded-[8px] overflow-hidden" v-for="(item, index) in monthItem.records" :key="index">
                  <open-container @tap="item.hasCertificate && handleToCertificate(item.id)">
                    <div class="history-item-card">
                      <image class="history-item-card__cover" mode="aspectFill" :src="item.coverUrl" :fade-in="true" />
                      <div class="history-item-card__right overflow-hidden">
                        <text class="text-[#333] text-[20px] leading-[28px] font-bold mb-[4px]" overflow="ellipsis">{{ item.name }}</text>
                        <div class="text-[#666] text-[16px] leading-[22px]">{{ item.monthDay }}</div>
                      </div>
                    </div>
                  </open-container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </my-scroll-view>
      <div class="w-full h-full flex items-center justify-center" v-else>
        <nut-empty description="暂无活动纪念" />
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import chroma from 'chroma-js';
import { getDominantColor } from '@/utils/color';
import { useContentHeight, useGetCertificate } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { IVolunteerHistoryItem } from '@/composables';

const history = ref<IVolunteerHistoryItem[]>([]);
const yearItemCollapsedMap = ref<boolean[]>([]);

const height = useContentHeight();

const handleToCertificate = async (id: number) => {
  Taro.showLoading({ title: '加载中' });

  const certificate = await useGetCertificate({ id });
  const canvas = Taro.createOffscreenCanvas({ type: '2d' });
  const image = canvas.createImage();
  await new Promise(resolve => {
    image.onload = resolve;
    image.src = certificate.coverUrl;
  });
  const { width, height } = image;
  const ctx = canvas.getContext('2d') as any;
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height) as Taro.ImageData;
  const domiantColor = getDominantColor({ imageData }) ?? '#333';
  const chromaDomiantColor = chroma(domiantColor);
  const primaryColor = chromaDomiantColor.luminance() <= 0.1 ? chromaDomiantColor.brighten(1.3).hex() : domiantColor;

  Taro.preload({
    certificate,
    primaryColor,
  });

  Taro.hideLoading();
  Taro.navigateTo({ url: '/packageB/pages/certificate/certificate' });
};

onMounted(() => {
  const { preloadData } = Taro.getCurrentInstance();
  if(!preloadData) return;
  
  history.value = preloadData.history as IVolunteerHistoryItem[];
  yearItemCollapsedMap.value = Array(history.value.length).fill(false);
});
</script>

<style lang="scss">
  @use 'history' as *;
</style>