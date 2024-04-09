<template>
  <scroll-view 
    class="bg-[#F7F7F7] pt-[16px]"
    :style="{ height: `${height}px` }"
    :enhanced="true"
    :enable-passive="true"
    :scroll-y="true"
    :show-scrollbar="false"
    :fast-deceleration="true"
    @scrolltolower="getMoreRecords()"
  >
    <div class="space-y-[12px]" v-if="recordList.length">
      <SignUpRecordCard v-for="(record, index) in recordList" :key="index" :data="record" @cancel="info => emit('cancel', info)" />
    </div>
    <nut-empty description="暂无数据" v-else />
    <div class="h-[20px]"></div>
  </scroll-view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { ref, onMounted } from 'vue';
import { useThrottleFn, useEventBus } from '@vueuse/core';
import { useGetSignUpRecords } from '@/composables/use-api';
import { setSignUpRecordStateEventBusKey } from '@/constants/token';
import SignUpRecordCard from './sign-up-record-card.vue';

import type { ISignUpRecord } from '@/composables/use-api-types';
import type { VolunteerSignUpState } from '@/constants';
import type { CancelInfo } from './sign-up-record-card.vue';

const props = defineProps<{
  height: number;
  state?: VolunteerSignUpState;
}>();
const emit = defineEmits<{ cancel: [info: CancelInfo] }>();

let current = 1;

const recordList = ref<ISignUpRecord[]>([]);

const eventBus = useEventBus(setSignUpRecordStateEventBusKey);

const fetchSignUpRecordList = async (page?: number) => {
  if(page) current = page;
  Taro.showLoading({ title: '加载中' });
  const { records } = await useGetSignUpRecords({ 
    size: 6,
    page: current,
    activityWorkVolunteerState: props.state ?? null,
  });
  Taro.hideLoading();
  if(!records.length && current > 1) return;

  current === 1 ? (recordList.value = records) : recordList.value.push(...records);
  current++;
};

const getMoreRecords = useThrottleFn(fetchSignUpRecordList, 2000);

const setRecordState = (id: number, state: VolunteerSignUpState) => {
  const index = recordList.value.findIndex(({ id: _id }) => _id === id);
  if(index < 0) return;

  recordList.value[index].activityWorkVolunteerState = state;
};

eventBus.on(({ currentListKey, state, id }) => {
  if(props.state !== currentListKey) return;

  setRecordState(id, state);
});

onMounted(fetchSignUpRecordList);
</script>