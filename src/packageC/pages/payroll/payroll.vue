<template>
  <ConfigProvider>
    <Container navbar-title="酬金情况" content-class="pt-[16px] px-[16px]" disable-safe-bottom background>
      <my-scroll-view class="space-y-[16px]" :height="height" v-if="payrollRecords.length">
        <div class="payroll-record-item-year" v-for="(yearItem, yearIndex) in payrollRecords" :key="yearIndex">
          <div class="payroll-record-item-year__title" @tap="yearItemCollapsedMap[yearIndex] = !yearItemCollapsedMap[yearIndex]">
            {{ yearItem.year }} 年
            <image class="payroll-record-item-year__arrow-icon" :class="yearItemCollapsedMap[yearIndex] ? 'is-collapsed' : ''" src="@/assets/icon/history/arrow.svg" mode="aspectFit" :svg="true" />
          </div>
          <div class="space-y-[8px]" v-show="!yearItemCollapsedMap[yearIndex]">
            <div class="payroll-record-item-month" v-for="(monthItem, monthIndex) in yearItem.records" :key="monthIndex">
              <div class="payroll-record-item-month__title">{{ monthItem.month }} 月</div>
              <div class="space-y-[8px]">
                <div class="payroll-record-item-card" v-for="(item, index) in monthItem.records" :key="index" >
                  <image class="payroll-record-item-card__cover" mode="aspectFill" :src="item.coverUrl" :fade-in="true" />
                  <div class="payroll-record-item-card__right overflow-hidden">
                    <div class="flex text-[#0D0F02] text-[14px] leading-[20px] font-bold">
                      <text class="flex-auto mr-[10px]" overflow="ellipsis">{{ item.title }}</text>
                      <div class="flex-shrink-0">￥{{ item.transferMoney }}</div>
                    </div>
                    <div class="text-[#404040] text-[12px] leading-[17px] flex items-center justify-between">
                      {{ `岗位：${item.workName}` }}
                      <div class="text-[#808080]">{{ item.monthDayTime }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </my-scroll-view>
      <div class="w-full h-full flex items-center justify-center" v-else>
        <nut-empty description="暂无酬金情况" />
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import { useContentHeight } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { IPayrollRecordYearItem } from '@/composables/use-api-types';

const payrollRecords = ref<IPayrollRecordYearItem[]>([]);
const yearItemCollapsedMap = ref<boolean[]>([]);

const height = useContentHeight();

onMounted(() => {
  const { preloadData } = Taro.getCurrentInstance();
  if(!preloadData) return;
  
  payrollRecords.value = preloadData.payrollRecords as IPayrollRecordYearItem[];
  yearItemCollapsedMap.value = Array(payrollRecords.value.length).fill(false);
});

</script>

<style lang="scss">
@use 'payroll' as *;
</style>