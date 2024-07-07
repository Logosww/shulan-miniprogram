<template>
  <ConfigProvider>
    <Container navbar-title="积分商城" content-class="pt-[28px] px-[16px] overflow-y-auto" :bg-style="{ backgroundColor: '#F4F4F4' }" background tabbar-page>
      <div class="text-[#0D0F02] text-[16px] leading-[22px] font-bold mb-[4px]">我的积分</div>
      <div class="flex items-baseline justify-between">
        <div class="flex items-baseline">
          <div class="text-[#0D0F02] text-[40px] leading-[44px] font-bold tracking-[4px] mr-[12px]">600</div>
          <image class="w-[6px] h-[12px]" src="@/assets/icon/welfare/arrow-right.svg" mode="aspectFit" :svg="true" />
        </div>
        <div class="flex items-center">
          <image class="w-[18px] h-[18px] mr-[6px]" src="@/assets/icon/welfare/rule.svg" mode="aspectFit" :svg="true" />
          <div class="text-[#404040] text-[12px] leading-[17px]">积分规则</div>
        </div>
      </div>
      <div class="banner mt-[26px]">
        <image class="w-[97px] h-[60px] absolute bottom-0 left-0 rounded-[16px] overflow-hidden" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/look_activity_history.png" />
        <image class="w-[76px] h-[49px] absolute top-[-22px] left-[37px]" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/wow.png" />
        <div class="text-white absolute top-[14px] left-[86px]">
          <div class="text-[16px] leading-[22px] font-bold">积分抽奖</div>
          <div class="text-[14px] leading-[20px] font-[500]">快去抽取惊喜奖品吧~</div>
        </div>
        <div 
          class="absolute right-[20px] top-[50%] w-[72px] h-[30px] leading-[30px] bg-white text-center text-[#0D0F02] text-[16px] font-bold rounded-[34px]"
          style="transform: translateY(-50%);"
        >
          去抽奖
        </div>
      </div>
      <div class="text-black text-[20px] leading-[24px] mt-[20px] mb-[16px] font-bold before:absolute">
        <text class="relative z-[1] before:absolute before:z-[-1] before:content-[''] before:h-[8px] before:w-full before:left-0 before:bottom-0 before:bg-[#51FE81] before:rounded-[12px]">积分商城</text>
      </div>
      <div class="space-y-[10px]">
        <div class="bg-white p-[12px] rounded-[12px] flex items-center justify-between" @tap="Taro.navigateTo({ url: '/packageC/pages/product-detail/product-detail' })">
          <image class="w-[80px] h-[96px] rounded-[8px] mr-[12px] overflow-hidden flex-shrink-0 bg-slate-100" />
          <div class="flex-auto flex flex-col justify-between">
            <div class="text-[#0D0F02] text-[14px] leading-[20px] font-[500] line-clamp-3 text-ellipsis">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
            <div class="flex justify-between items-baseline">
              <text class="text-[#41CC68]">
                <text class="text-[22px] leading-[30px] font-bold mr-[4px]">25</text>
                <text class="text-[14px] leading-[20px]">积分</text>
              </text>
              <div class="text-[#666] text-[12px] leading-[17px]">已兑120份</div>
            </div>
          </div>
        </div>
        <div class="bg-white p-[12px] rounded-[12px] flex items-center justify-between" @tap="Taro.navigateTo({ url: '/packageC/pages/product-detail/product-detail' })">
          <image class="w-[80px] h-[96px] rounded-[8px] mr-[12px] overflow-hidden flex-shrink-0 bg-slate-100" />
          <div class="flex-auto flex flex-col justify-between">
            <div class="text-[#0D0F02] text-[14px] leading-[20px] font-[500] line-clamp-3 text-ellipsis">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
            <div class="flex justify-between items-baseline">
              <text class="text-[#41CC68]">
                <text class="text-[22px] leading-[30px] font-bold mr-[4px]">25</text>
                <text class="text-[14px] leading-[20px]">积分</text>
              </text>
              <div class="text-[#666] text-[12px] leading-[17px]">已兑120份</div>
            </div>
          </div>
        </div>
        <div class="bg-white p-[12px] rounded-[12px] flex items-center justify-between" @tap="Taro.navigateTo({ url: '/packageC/pages/product-detail/product-detail' })">
          <image class="w-[80px] h-[96px] rounded-[8px] mr-[12px] overflow-hidden flex-shrink-0 bg-slate-100" />
          <div class="flex-auto flex flex-col justify-between">
            <div class="text-[#0D0F02] text-[14px] leading-[20px] font-[500] line-clamp-3 text-ellipsis">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
            <div class="flex justify-between items-baseline">
              <text class="text-[#41CC68]">
                <text class="text-[22px] leading-[30px] font-bold mr-[4px]">25</text>
                <text class="text-[14px] leading-[20px]">积分</text>
              </text>
              <div class="text-[#666] text-[12px] leading-[17px]">已兑120份</div>
            </div>
          </div>
        </div>
        <div class="bg-white p-[12px] rounded-[12px] flex items-center justify-between" @tap="Taro.navigateTo({ url: '/packageC/pages/product-detail/product-detail' })">
          <image class="w-[80px] h-[96px] rounded-[8px] mr-[12px] overflow-hidden flex-shrink-0 bg-slate-100" />
          <div class="flex-auto flex flex-col justify-between">
            <div class="text-[#0D0F02] text-[14px] leading-[20px] font-[500] line-clamp-3 text-ellipsis">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
            <div class="flex justify-between items-baseline">
              <text class="text-[#41CC68]">
                <text class="text-[22px] leading-[30px] font-bold mr-[4px]">25</text>
                <text class="text-[14px] leading-[20px]">积分</text>
              </text>
              <div class="text-[#666] text-[12px] leading-[17px]">已兑120份</div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[100px]"></div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
</script>

<style lang="scss">

</style>