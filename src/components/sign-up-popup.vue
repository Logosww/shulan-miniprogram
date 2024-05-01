<template>
  <Popup title="立即报名" v-model="popupVisible" :pop-style="{ backgroundColor: '#FAFAFA'}" @close="selectedWorks = []">
    <div class="job-list space-y-[16px]">
      <div 
        :class="['job-card', item.isFull ? 'is-disabled' : '', selectedWorks.includes(item.id) ? 'is-active' : '']"
        v-for="item in data?.workList" :key="item.id"
        @tap="item.isFull ? void 0 : handleToggleSelect(item.id)"
      >
        <div class="job-card__title">{{ item.name }}</div>
        <div class="text-[#404040] font-[500] leading-[16px]">工作时间：</div>
        <div class="text-[#404040] font-bold leading-[16px]">
          {{ moment(item.startAt).format('YYYY.MM.DD HH:mm') }} — {{ moment(item.endAt).format('YYYY.MM.DD HH:mm') }}
        </div>
        <div class="job-card__reward">
          <div class="flex items-center">
            <image class="w-[12px] h-[12px] ml-[4px]" src="@/assets/icon/integral.svg" :svg="true" />
            +{{ item.integral }}
          </div>
          ￥{{ item.money }}
        </div>
        <div class="job-card__checkbox"></div>
      </div>
    </div>
    <div class="text-[12px] text-[#666] my-[12px] text-center leading-[14px]">具体薪资发放以现场实际为准</div>
    <div :class="['action-btn', (isAvailable && selectedWorks.length) ? '' : 'is-disabled']" @tap="handleSignUp">
      <div class="action-btn__title">立即报名</div>
      <div class="action-btn__extra" v-if="isAvailable">（{{ moment(data?.signupEndAt).format(' YYYY 年 MM 月 DD 日') }}截止）</div>
    </div>
  </Popup>
  <ConfirmModal title="温馨提示" v-model="verifyModalVisible" just-notify @confirm="Taro.navigateTo({ url: '/packageB/pages/verify/verify' })" v-if="store.role === Role.user">
    <div class="text-[#666] text-[12px] leading-[17px] text-center whitespace-pre-line">
      您还没完成志愿者认证，请先前往进行认证  
    </div>
  </ConfirmModal>
</template>

<script lang="ts" setup>
import moment from 'moment';
import Taro from '@tarojs/taro';
import { ref, computed } from 'vue';
import { useStore } from '@/store';
import { Role } from '@/constants';
import Popup from './popup.vue';

import type { IWorkData } from '@/composables/use-api-types';

const props = defineProps<{
  data?: IWorkData;
}>();

const emit = defineEmits<{
  'sign-up': [workIds: number[]];
}>();

const popupVisible = defineModel<boolean>({ required: true, default: false });
const verifyModalVisible = ref(false);

const selectedWorks = ref<number[]>([]);

const isAvailable = computed(() => props.data?.workList.some(({ isFull }) => !isFull));

const store = useStore();

const handleToggleSelect = (id: number) => {
  const index = selectedWorks.value.findIndex(_id => _id === id);
  if(index < 0) selectedWorks.value.push(id);
  else selectedWorks.value.splice(index, 1);
};

const handleSignUp = () => {
  if(store.role === Role.user) return verifyModalVisible.value = true;

  selectedWorks.value.length && emit('sign-up', selectedWorks.value);
};

</script>

<style lang="scss">
  @use '../assets/style/components/sign-up-popup' as *;
</style>