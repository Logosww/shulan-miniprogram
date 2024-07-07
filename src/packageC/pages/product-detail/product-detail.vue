<template>
  <ConfigProvider>
    <Container navbar-title="商品详情" content-class="bg-[#F7F7F7] overflow-y-auto" disable-safe-bottom>
      <div class="bg-white p-[16px] pt-[10px] mb-[16px]">
        <div class="bg-slate-100 rounded-[8px] h-[200px] mb-[20px]"></div>
        <div class="text-[#41CC68] text-[28px] leading-[24px] mb-[12px] font-bold">￥25</div>
        <div class="flex items-center justify-between mb-[10px]">
          <div class="text-[#0D0F02] text-[14px] leading-[18px] font-bold">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
          <div class="flex flex-col items-center divide-x-[1px] divide-[#E6E6E6] flex-shrink-0 mr-[12px] ml-[9px]">
            <image class="w-[16px] h-[16px] mb-[6px]" src="@/assets/icon/product-detail/share.svg" mode="aspectFit" :svg="true" />
            <div class="text-[#404040] text-[12px]">分享</div>
          </div>
        </div>
        <div class="text-[#666] text-[12px] leading-[16px]">如需电子徽章，下单时请备注志愿者账号</div>
      </div>
      <div class="bg-white p-[16px]">
        <div class="text-[#0D0F02] text-[16px] leading-[22px] mb-[12px]">商品说明（设计理念、包装详情等）</div>
        <div class="space-y-[10px]">
          <div class="bg-slate-100 h-[300px] rounded-[4px]"></div>
          <div class="bg-slate-100 h-[300px] rounded-[4px]"></div>
          <div class="bg-slate-100 h-[300px] rounded-[4px]"></div>
          <div class="bg-slate-100 h-[300px] rounded-[4px]"></div>
        </div>
      </div>
      <div class="h-[100px]"></div>
      <div class="action-bar">
        <div class="w-full bg-[#51FE81] text-[#0D0F02] text-[16px] font-bold leading-[44px] text-center rounded-[37px]">立即兑换</div>
      </div>
    </Container>
  </ConfigProvider>
</template>

<script setup lang="ts">
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
</script>

<style scoped>

</style>