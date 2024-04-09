<template>
  <div class="bg-white flex border-0" :class="[block ? '' : 'rounded-[8px] p-[12px]']" @tap="Taro.navigateTo({ url: `/pages/activity-detail/activity-detail?id=${data.id}` })">
    <div class="relative w-[88px] h-[120px] rounded-[4px] mr-[10px] overflow-hidden flex-shrink-0">
      <image class="w-full h-full bg-slate-100" mode="aspectFill" :src="data.coverUrl" />
      <div class="absolute w-[48px] right-0 top-[10px] text-[#0D0F02] text-center text-[12px] font-bold leading-[20px] bg-[#51FE81]">{{ activityTypeMap[data.type] }}</div>
    </div>
    <div class="flex-[1] flex flex-col justify-between">
      <div class="text-[#0D0F02] text-[14px] font-bold leading-[20px] line-clamp-2 text-ellipsis">
        <div 
          class="inline-block px-[6px] text-[12px] text-center leading-[19px] font-bold rounded-[4px] mr-[2px]"
          :class="workTagMap[data.label]!.class"
          style="transform: translateY(-1px);"
          v-if="data.label"
        >
          {{ workTagMap[data.label]!.text }}
        </div>
        {{ data.name }}
      </div>
      <div>
        <div class="text-[#666] text-[12px] leading-[16px] mb-[10px]">
          <div class="flex items-center mb-[5px]">
            <image class="w-[14px] h-[14px] mr-[4px]" src="@/assets/icon/home/time.svg" :svg="true" />
            {{ moment(data.startAt).format('YYYY.MM.DD') }} - {{ moment(data.endAt).format('YYYY.MM.DD') }}
          </div>
          <div class="flex items-center">
            <image class="w-[14px] h-[14px] mr-[4px] flex-shrink-0" src="@/assets/icon/home/position_1.svg" :svg="true" />
            <div class="line-clamp-1 text-ellipsis">{{ data.city }} | {{ data.address }}</div>
          </div>
        </div>
        <div class="pt-[8px] flex items-center justify-between border-0">
          <div class="relative h-[16px] mr-[4px]">
            <div
              v-for="(avatar, index) in data.avatarNameList" 
              :key="index"
              class="w-[16px] h-full inline-flex rounded-full overflow-hidden bg-slate-50 ml-[-4px] items-center justify-center"
              :style="index ? '' : 'margin-left: 0;'"
            >
              <image class="w-full h-full" :src="avatar.avatarUrl" v-if="avatar.avatarUrl" />
              <div class="text-[12px] text-[#36b23b]" v-else>{{ avatar.name[0] }}</div>
            </div>
          </div>
          <div 
            class="py-[2px] w-[120px] text-center leading-[24px] text-[#0D0F02] text-[14px] font-bold rounded-[42px] bg-[#51FE81]"
            v-if="data.state === ActivityState.activated"
          >
            立即报名
          </div>
          <div 
            class="py-[2px] w-[120px] text-center leading-[24px] text-[#B3B3B3] text-[14px] font-bold rounded-[42px] bg-[#F2F2F2]"
            v-if="data.state === ActivityState.auditPassed"
          >
            报名待开启
          </div>
          <div 
            class="py-[2px] w-[120px] text-center leading-[24px] text-[#51FE81] text-[14px] font-bold rounded-[42px] bg-[#0D0F02]"
            v-if="data.state === ActivityState.finished"
          >
            现场回顾
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
import Taro from '@tarojs/taro';
import { activityTypeMap, ActivityState, workTagMap } from '@/constants/value-enum';

import type { IActivityPreview } from '@/composables/use-api-types';

defineProps<{
  data: IActivityPreview;
  block?: boolean;
}>();
</script>