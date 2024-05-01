<template>
  <div class="bg-white p-[12px] relative z-0">
    <image
      class="absolute bottom-[14px] right-[-20px] w-[137px] h-[137px] -z-10"
      v-if="[
        VolunteerSignUpState.auditFailed,
        VolunteerSignUpState.auditPassed,
        VolunteerSignUpState.offWork,
        VolunteerSignUpState.finished,
      ].includes(data.activityWorkVolunteerState)"
      :src="`//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/seal_${data.activityWorkVolunteerState}.png`"
    />
    <div class="flex justify-between">
      <div class="relative w-[88px] h-[120px] rounded-[4px] overflow-hidden mr-[10px] flex-shrink-0">
        <image class="w-full h-full mr-[10px]" mode="aspectFill" :src="data.activity.coverUrl" />
        <div class="absolute w-[48px] right-0 top-[10px] text-[#0D0F02] text-center text-[12px] font-bold leading-[20px] bg-[#51FE81]">
          {{ activityTypeMap[data.activity.type] }}
        </div>
      </div>
      <div class="flex flex-col justify-between flex-auto">
        <text class="text-[#0D0F02] font-bold leading-[20px] line-clamp-2 text-ellipsis">
          <text 
            class="px-[6px] text-[12px] text-center leading-[19px] font-bold rounded-[4px] mr-[2px] align-top"
            :class="workTagMap[data.work.label]!.class"
            v-if="data.work.label"
          >
            {{ workTagMap[data.work.label]!.text }}
          </text>
          {{ data.activity.name }}
        </text>
        <div class="flex flex-col">
          <div class="text-[12px] font-bold leading-[17px] mb-[2px]">
            {{ data.activityWorkVolunteerIdentity !== VolunteerType.normal ? '其他' : data.work.name }}
            <div
              class="inline-block text-[10px] leading-[14px] px-[8px] text-[#41CC68] border-[#41CC68] border-solid border-[1px] rounded-[4px]"
              v-if="data.activityWorkVolunteerIdentity !== VolunteerType.normal"
            >
              {{ volunteerTypeMap[data.activityWorkVolunteerIdentity] }}
            </div>
          </div>
          <div class="text-[#666] text-[12px] leading-[17px]">
            <div v-if="data.activityWorkVolunteerIdentity === VolunteerType.normal">
              <div class="flex items-center">
                <image class="w-[14px] h-[14px] mr-[4px] flex-shrink-0" src="@/assets/icon/home/time.svg" :svg="true" />
                工作时间：
              </div>
              {{ moment(data.work.startAt).format('YYYY.MM.DD HH:mm') }}—{{ moment(data.work.endAt).format('YYYY.MM.DD HH:mm') }}
            </div>
            <div class="flex items-center">
              <image class="w-[14px] h-[14px] mr-[4px] flex-shrink-0" src="@/assets/icon/home/position_1.svg" :svg="true" />
              <div class="line-clamp-1 text-ellipsis">{{ data.activity.city }} | {{ data.activity.address }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-[12px] leading-[17px] text-right text-[#8ECCA0] ml-[8px] flex-shrink-0">
        <div :class="(dangerStateMap.includes(data.activityWorkVolunteerState) && data.activityWorkVolunteerIdentity === VolunteerType.normal) ? 'text-[#E54B17]' : ''">
          {{ data.activityWorkVolunteerIdentity !== VolunteerType.normal ? '其他' : volunteerSignUpStateMap[data.activityWorkVolunteerState] }}
        </div>
        <div class="text-[#0D0F02] text-[16px] font-bold leading-[22px] mt-[4px]">￥{{ data.work.money }}</div>
      </div>
    </div>
    <div class="my-[10px] h-[1px] bg-[#E6E6E6]"></div>
    <div class="flex justify-between items-center z-10">
      <div class="text-[#0D0F02] text-[13px] leading-[18px] font-[500]">志愿者编号：{{ data.id }}</div>
      <div class="font-bold leading-[24px] space-x-[8px]">
        <div 
          class="inline-block px-[16px] text-center bg-[#0D0F02] text-[#51FE81] rounded-[42px]"
          @tap="emit('cancel', {
            id: data.id,
            state: data.activityWorkVolunteerState,
            leftCancelCount: data.activityCancelCount,
            cancelDeadline: data.activity.signupCancelAt,
          })"
          v-if="
            data.activityWorkVolunteerIdentity === VolunteerType.normal
            && (
              data.activityWorkVolunteerState < VolunteerSignUpState.auditFailed
              || data.activityWorkVolunteerState === VolunteerSignUpState.atWork
            )
            && data.activityCancelCount
          "
        >
          取消报名
        </div>
        <div 
          class="inline-block px-[16px] text-center bg-[#0D0F02] text-[#51FE81]  rounded-[42px]"
          @tap="Taro.navigateTo({ url: `/packageA/pages/sign-up/sign-up?activityId=${data.activity.id}&activityWorkIds=${data.work.id}` })"
          v-if="[VolunteerSignUpState.cancelled, VolunteerSignUpState.auditFailed].includes(data.activityWorkVolunteerState)"
        >
          再次提交
        </div>
        <div 
          class="inline-block px-[16px] text-center bg-[#51FE81] text-[#0D0F02]  rounded-[42px]"
          @tap="Taro.navigateTo({ url: `/packageA/pages/sign-up-detail/sign-up-detail?id=${data.id}` })"
        >
          查看详情
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
import Taro from '@tarojs/taro';
import { 
  workTagMap,
  activityTypeMap,
  volunteerTypeMap,
  volunteerSignUpStateMap,
  VolunteerType,
  VolunteerSignUpState,
} from '@/constants/value-enum';

import type { ISignUpRecord } from '@/composables';

export type CancelInfo = {
  id: number;
  state: VolunteerSignUpState;
  leftCancelCount: number;
  cancelDeadline: string;
};

const dangerStateMap = [
  VolunteerSignUpState.offWork,
  VolunteerSignUpState.cancelled,
  VolunteerSignUpState.auditFailed,
  VolunteerSignUpState.cancelledOutOfIllegal,
];

defineProps<{ data: ISignUpRecord }>();
const emit = defineEmits<{ cancel: [info: CancelInfo] }>();

</script>