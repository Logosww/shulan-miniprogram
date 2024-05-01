<template>
  <ConfigProvider>
    <Container navbar-title="志愿者证书" :bg-style="{ backgroundColor: primaryColor }" :style="{ '--nut-navbar-color': isColdColor ? '#0D0F02' : '#eee' }" disable-safe-bottom>
      <my-scroll-view :height="contentHeight" v-show="!isLoading">
        <snapshot id="snapshot" mode="view">
          <div class="relative w-full">
            <image class="w-full" mode="widthFix" :src="data?.coverUrl" :fade-in="true" :lazy-load="false" />
            <div class="absolute w-full h-[32px] top-0" :style="topMaskStyle" v-show="isShowTopMask"></div>
            <div class="absolute w-full h-[32px] bottom-0" :style="bottomMaskStyle"></div>
          </div>
          <div class="p-[16px]" :style="bgGradientStyle">
            <div class="px-[20px] py-[16px] rounded-[16px] relative overflow-visible" style="background-image: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, .6) 100%);">
              <image class="absolute w-[137px] h-[137px] top-[-60px] right-[-39px]" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/logo_certificate.png" />
              <image class="absolute w-[97px] h-[100px] bottom-[10px] right-[8px]" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/corporate_chapter.png" />
              <div class="text-[#0D0F02] text-center text-[18px] leading-[26px] font-['custom-font'] mb-[4px]">{{ data?.title }}</div>
              <div class="text-center text-[14px] leading-[17px] font-['custom-font']" :style="{ color: bgColor }">志愿工作证明</div>
              <div class="my-[12px]">
                <div class="mb-[8px] font-bold text-[#0D0F02] text-[14px] leading-[20px] flex">
                  {{ data?.volunteerName }}
                  <div class="ml-[8px]">同学</div>
                </div>
                <div class="text-[14px] leading-[20px]">{{ data?.digest }}</div>
              </div>
              <div class="text-[#0D0F02] font-bold text-[14px] leading-[20px] text-right">杭州奔薇文化创意有限公司</div>
              <div class="text-[#0D0F02] font-bold text-[14px] leading-[20px] text-right">{{ data?.yearMonth }}</div>
            </div>
          </div>
        </snapshot>
        <div class="px-[16px]" :style="{ backgroundColor: bgColor }">
          <div class="bg-white mb-[32px] rounded-[16px] p-[16px]">
            <div class="text-[#0D0F02] text-[16px] font-bold leading-[22px] mb-[8px]">工作服务记录证明须知：</div>
            <div class="text-[#0D0F02] text-[12px] leading-[16px] font-[500] space-y-[16px]">
              <div>1.工作服务记录证明是由树懒提供的工作人员的工作服务时长电子产品。</div>
              <div>2.所有者须为树懒的平台用户。</div>
              <div>3.该证明仅作为参加「不会上树的树懒平台」相关活动的有效凭证，不提供任何志愿时长。</div>
              <div>4.请妥善保管，使用时请遵守相关规定和章程如有违法违规等行为，「不会上树的树懒」不承担法律后果。最终解释权归「不会上树的树懒所有」。</div>
            </div>
          </div>
          <div class="flex justify-center pb-[32px]">
            <div class="bg-white rounded-[37px] px-[64px] py-[11px] text-[16px] text-[#0D0F02] font-bold leading-[22px]" @click="handleCapture">下载我的志愿者工作证明</div>
          </div>
        </div>
      </my-scroll-view>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Taro, { Snapshot, useLoad } from '@tarojs/taro';
import chroma from 'chroma-js';
import { useContentHeight } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { IVolunteerCertificate } from '@/composables';

const isLoading = ref(true);
const isShowTopMask = ref(true);
const primaryColor = ref<string>();
const data = ref<IVolunteerCertificate>();

const isColdColor = computed(() => 
  primaryColor.value ? (chroma(primaryColor.value).luminance() >= .5) : true
);
const bgColor = computed(() => 
  primaryColor.value ? chroma(primaryColor.value).darken(1.3).hex() : ''
);
const bgGradientStyle = computed(() =>
  bgColor.value
    ? `background-image: linear-gradient(180deg, ${primaryColor.value!} 0%, ${bgColor.value} 50%, ${bgColor.value} 100%)`
    : ''
);
const bottomMaskStyle = computed(() =>
  primaryColor.value
    ? `background-image: linear-gradient(180deg, rgba(${
      chroma(primaryColor.value).rgb().join(', ')
    }, 0) 0%, rgba(${
      chroma(primaryColor.value).rgb().join(', ')
    }, .6) 60%, ${primaryColor.value} 100%)`
    : ''
);
const topMaskStyle = computed(() =>
  primaryColor.value
    ? `background-image: linear-gradient(180deg, ${primaryColor.value} 0%, rgba(${
      chroma(primaryColor.value).rgb().join(', ')
    }, .6) 60%, transparent 100%)`
    : ''
);

const contentHeight = useContentHeight();

const handleCapture = () => {
  Taro.showLoading({ title: '加载中' });
  isShowTopMask.value = false;
  Taro.nextTick(() => {
    Taro.createSelectorQuery()
      .select('#snapshot')
      .node()
      .exec(([{ node: snapshot }]) => {
        (snapshot as Snapshot).takeSnapshot({
          type: 'file',
          format: 'png',
          success: ({ tempFilePath: filePath }) => {
            Taro.saveImageToPhotosAlbum({
              filePath,
              success: () => {
                isShowTopMask.value = true;
                Taro.hideLoading();
                Taro.showToast({ icon: 'success', title: '已保存至相册' });
              },
              fail: console.error,
            })
          },
          fail: console.error,
        })
      });
  })
};

useLoad(async () => {
  Taro.showLoading({ title: '加载中' });
  const { preloadData } = Taro.getCurrentInstance();
  if(!preloadData) return;

  data.value = preloadData.certificate as IVolunteerCertificate;
  primaryColor.value = preloadData.primaryColor as string;

  Taro.loadFontFace({
    family: 'custom-font',
    source: 'https://common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/fontface.ttf',
    success: () => {
      isLoading.value = false;
      setTimeout(Taro.hideLoading, 600);
    },
    fail: console.error,
  });
});;
</script>