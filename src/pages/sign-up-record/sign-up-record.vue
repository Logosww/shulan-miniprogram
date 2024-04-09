<template>
  <ConfigProvider>
    <Container navbar-title="报名记录" disable-safe-bottom>
      <nut-tabs :ellipsis="false" :title-gutter="8" v-model="activeTab" title-scroll @change="handleTabSwitch">
        <nut-tab-pane title="全部报名" pane-key="all">
          <SignUpRecordList :height="contentHeight - 42" @cancel="handleCancel" />
        </nut-tab-pane>
        <nut-tab-pane v-for="state in volunteerSignUpStateMap" :key="state" :pane-key="state" :title="_volunteerSignUpStateMap[state]">
          <SignUpRecordList :state="state" :height="contentHeight - 42" v-if="renderedTabKey.includes(state)" @cancel="handleCancel" />
        </nut-tab-pane>
      </nut-tabs>
      <ConfirmModal 
        title="温馨提示"
        v-model="cancelConfirmModalVisible"
        :cancel-btn-title="confirmModalCancelBtnTitle"
        :confirm-btn-title="confirmModalConfirmBtnTitle"
        @confirm="handleModalConfirm"
        @cancel="handleModalCanCel"
      >
        <div class="text-[#666] text-[12px] leading-[17px] text-center">
          <text v-show="toBeCancelledRecordState === VolunteerSignUpState.awaitingAudit">
            {{ '您正在取消此次活动报名。\n' }}<text class="text-[#404040] font-bold">{{ cancelDeadline }}</text> 前，您共有 <text class="text-[#404040] font-bold">{{ leftCancelCount }}</text> 次取消机会，{{ '\n此后取消将视为违规取消' }}
          </text>
          <text v-show="toBeCancelledRecordState === VolunteerSignUpState.auditPassed">
            {{ '您已成功通过此次活动报名，\n' }}若坚持取消，将视为违规取消
          </text>
        </div>
      </ConfirmModal>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import moment from 'moment';
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import { volunteerSignUpStateMap as _volunteerSignUpStateMap, VolunteerSignUpState } from '@/constants';
import { useCancelSignUp, useContentHeight } from '@/composables';
import { setSignUpRecordStateEventBusKey } from '@/constants/token';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import ConfirmModal from '@/components/confirm-modal.vue';
import SignUpRecordList from './components/sign-up-record-list.vue';

import type { CancelInfo } from './components/sign-up-record-card.vue';

let toBeCancelledRecordId: number;

const volunteerSignUpStateMap = 
  Object.keys(_volunteerSignUpStateMap).map(state => parseInt(state) as VolunteerSignUpState);

const activeTab = ref<VolunteerSignUpState | 'all'>('all');
const renderedTabKey = ref<VolunteerSignUpState[]>([]);
const leftCancelCount = ref(0);
const cancelDeadline = ref('');
const confirmModalCancelBtnTitle = ref('');
const confirmModalConfirmBtnTitle = ref('');
const cancelConfirmModalVisible = ref(false);
const toBeCancelledRecordState = ref<VolunteerSignUpState>();

const contentHeight = useContentHeight();

const eventBus = useEventBus(setSignUpRecordStateEventBusKey);

const handleTabSwitch = ({ paneKey: key }) => 
  !renderedTabKey.value.includes(key) && renderedTabKey.value.push(parseInt(key) as VolunteerSignUpState);

const handleCancel = (info: CancelInfo) => {
  const { id, state, cancelDeadline: deadline, leftCancelCount: leftCount } = info;
  if(state === VolunteerSignUpState.awaitingAudit) {
    leftCancelCount.value = leftCount;
    cancelDeadline.value = moment(deadline).format('YYYY.M.D HH:mm');
    confirmModalCancelBtnTitle.value = '放弃取消';
    confirmModalConfirmBtnTitle.value = '确认取消';
  } else {
    confirmModalCancelBtnTitle.value = '仍要取消';
    confirmModalConfirmBtnTitle.value = '放弃取消';
  }
  toBeCancelledRecordId = id;
  toBeCancelledRecordState.value = state;
  cancelConfirmModalVisible.value = true;
};

const doCancel = async () => {
  await useCancelSignUp({ id: toBeCancelledRecordId });
  eventBus.emit({
    id: toBeCancelledRecordId,
    state: VolunteerSignUpState.cancelled,
    currentListKey: activeTab.value !== 'all' ? activeTab.value : void 0,
  });
  Taro.showToast({ icon: 'success', title: '取消成功' });
};

const handleModalConfirm = () => {
  if(toBeCancelledRecordState.value === VolunteerSignUpState.awaitingAudit)
    doCancel();
};

const handleModalCanCel = () => {
  if(toBeCancelledRecordState.value === VolunteerSignUpState.auditPassed)
    doCancel();
};
</script>

<style lang="scss">
  @use 'sign-up-record' as *;
</style>