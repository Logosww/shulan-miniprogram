<template>
  <ConfigProvider>
    <Container navbar-title="酬金情况" content-class="pt-[16px] px-[16px] overflow-y-auto" disable-safe-bottom background>
      <div class="space-y-[16px]" v-if="payrollRecords.length">
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
                      <div class="flex-auto mr-[10px] truncate">{{ item.name }}</div>
                      <div class="flex-shrink-0">￥{{ item.totalMoney }}</div>
                    </div>
                    <div class="space-y-[4px] text-[#404040] text-[12px] leading-[17px]" v-if="item.workList.length">
                      <div class="flex items-center justify-between" v-if="item.workList.length <= 1">
                        {{ `岗位：${item.workList[0].name} ￥${item.workList[0].money }` }}
                        <div class="text-[#808080]">{{ item.workList[0].paidTime }}</div>
                      </div>
                      <div class="flex items-center justify-between" v-for="(work, index) in item.workList" :key="index" v-else>
                        {{ `岗位${index + 1}：${work.name} ￥${work.money }` }}
                        <div class="text-[#808080]">{{ work.paidTime }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-full flex items-center justify-center" v-else>
        <nut-empty description="暂无酬金情况" />
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';

import type { IPayrollRecordYearItem } from '@/composables/use-api-types';

const payrollRecords = ref<IPayrollRecordYearItem[]>([]);
const yearItemCollapsedMap = ref<boolean[]>([]);

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