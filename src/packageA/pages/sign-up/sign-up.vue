<template>
  <ConfigProvider>
    <Container navbar-title="活动报名" disable-safe-bottom>
      <div class="relative h-full overflow-hidden">
        <div class="bg-white absolute box-border w-full h-full p-[16px] space-y-[40px] skeleton" v-if="isLoading">
          <div>
            <nut-skeleton avatar-size="96px" avatar-shape="square" row="3" height="16px" width="280px" avatar animated round />
          </div>
          <div>
            <nut-skeleton row="3" height="16px" width="398px" animated round />
          </div>
          <div>
            <nut-skeleton row="2" height="16px" width="398px" animated round />
          </div>
          <div>
            <nut-skeleton row="3" height="16px" width="398px" animated round />
          </div>
          <div>
            <nut-skeleton row="2" height="16px" width="398px" animated round />
          </div>
          <div>
            <nut-skeleton row="3" height="16px" width="398px" animated round />
          </div>
        </div>
        <my-scroll-view
          class="bg-[#F7F7F7] animation-fade-in"
          :height="contentHeight"
          v-else
        >
          <div class="bg-white py-[14px] px-[16px]">
            <div class="flex">
              <image class="w-[50px] h-[68px] rounded-[7px] flex-shrink-0 mr-[12px]" mode="aspectFill" :src="data?.activity.coverUrl" :fade-in="true" />
              <div class="pt-[4px] text-[#0D0F02] leading-[20px] font-bold line-clamp-3 text-ellipsis">
                {{ data?.activity.city }} |【{{ data && activityTypeMap[data.activity.type] }}】{{ data?.activity.name }}
              </div>
            </div>
            <div class="mt-[12px] text-[#404040] leading-[17px] font-[500] text-[12px]" v-for="(work, index) in data?.workList" :key="index">
              <div class="mb-[4px] font-bold">{{ work.name }}</div>
              工作时间：<br>
              {{ moment(work.startAt).format('YYYY.MM.DD HH:mm') }} — {{ moment(work.endAt).format('YYYY.MM.DD HH:mm') }}
            </div>
          </div>
          <div class="mt-[16px] mb-[12px] ml-[16px] text-[#262626] text-[16px] font-[500] leading-[20px]">个人认证信息</div>
          <div class="bg-white text-[#B3B3B3] leading-[20px] px-[16px] divide-y divide-[#E6E6E6]">
            <div class="flex justify-between py-[10px]">
              <div class="text-[#0D0F02] font-[500]">姓名</div>{{ data?.volunteer.name }}
            </div>
            <div class="flex justify-between py-[10px]">
              <div class="text-[#0D0F02] font-[500]">性别</div>{{ data && genderMap[data.volunteer.sex] }}
            </div>
            <div class="flex justify-between py-[10px]">
              <div class="text-[#0D0F02] font-[500]">年龄</div>{{ data?.volunteer.age }}
            </div>
            <div class="flex justify-between py-[10px]">
              <div class="text-[#0D0F02] font-[500]">手机号</div>{{ data?.volunteer.desensitizedPhone }}
            </div>
            <div class="flex justify-between py-[10px]">
              <div class="text-[#0D0F02] font-[500]">证件照片</div>已上传
            </div>
            <div class="flex justify-between py-[10px]">
              <div class="text-[#0D0F02] font-[500]">证件号码</div>{{ data?.volunteer.desensitizedIdCard }}
            </div>
            <div class="flex justify-between py-[10px]" v-if="data?.volunteer.experienceUrls.length">
              <div class="text-[#0D0F02] font-[500]">相关经历证明</div>已上传
            </div>
            <div class="flex justify-between py-[10px]">
              <div class="text-[#0D0F02] font-[500]">报名本次活动的原因</div>
              <div class="flex items-center" @tap="handleInputReason">
                <div class="max-w-[182px] truncate">{{ reason || '请填写您的报名原因' }}</div>
                <image class="w-[14px] h-[14px] ml-[8px]" src="@/assets/icon/sign-up/modify.svg" mode="aspectFit" :svg="true" />
              </div>
            </div>
          </div>
          <div class="mt-[16px] mb-[12px] ml-[16px] text-[#262626] text-[16px] font-[500] leading-[20px]">温馨提示</div>
          <div class="bg-white mx-[16px] rounded-[12px] py-[16px] px-[12px] text-[#404040] leading-[20px]">
            <div class="flex items-baseline mb-[12px]">
              <image class="w-[12px] h-[12px] mr-[8px] flex-shrink-0" src="@/assets/icon/verify/tip.svg" mode="aspectFit" :svg="true" />
              <text class="text-[#404040] text-[12px] font-[500] leading-[18px]">
                本活动取消报名截止时间为 
                <text class="text-[13px] font-extrabold">{{ moment(data?.cancelAt.time).format('YYYY.MM.DD HH:mm') }}</text>，即报名截止前 <text class="text-[13px] font-extrabold">{{ data?.cancelAt.deadline }}</text> 天。 超时取消报名将被视为违规取消。
              </text>
            </div>
            <div>本次活动由组织方「不会上树的树懒」发起，请勿轻信非官方渠道的虚假信息，谨防您的利益受损。</div>
            <div>如有疑问可在微信公众号「不会上树的树懒」后台留言提问。</div>
            <div>最终解释权归「不会上树的树懒」所有。</div>
          </div>
          <div class="h-[80px]"></div>
          <root-portal>
            <div class="action-bar" :class="[isLoading ? 'is-hidden' : '']">
              <div 
                class="w-full text-[#0D0F02] text-[16px] leading-[44px] font-bold rounded-[37px] bg-[#51FE81] text-center"
                :class="[data && reason ? '' : 'bg-[#F2F2F2] text-[#B3B3B3]']"
                @tap="data ? handleValidate() : void 0"
              >
                确认报名
              </div>
            </div>
          </root-portal>
        </my-scroll-view>
      </div>
      <ConfirmModal title="温馨提示" v-model="confirmModalVisible" @confirm="handleSignUp">
        <div class="text-[#666] text-[12px] leading-[17px] text-center whitespace-pre-line">
          <div>报名提交后信息不可更改，</div>
          <div>确认提交报名吗?</div>
        </div>
      </ConfirmModal>
      <ConfirmModal title="温馨提示" v-model="notifyModalVisible" just-notify @confirm="handleNotifyConfirm">
        <div class="text-[#666] text-[12px] leading-[17px] text-center whitespace-pre-line">{{ notifyContent }}</div>
      </ConfirmModal>
      <ConfirmModal title="温馨提示" v-model="toLoginModalVisible" @confirm="Taro.navigateTo({ url: '/pages/login/login' })">
        <div class="text-[#666] text-[12px] leading-[17px] text-center whitespace-pre-line">你还未登录，是否登录</div>
      </ConfirmModal>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import moment from 'moment';
import Taro, { useLoad, useReady, useDidShow } from '@tarojs/taro';
import { ref } from 'vue';
import { useStore } from '@/store';
import { handleFieldInput } from '@/utils';
import { genderMap, activityTypeMap, Role } from '@/constants';
import { useContentHeight, useGetSignUpPageData, useSignUp } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import ConfirmModal from '@/components/confirm-modal.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { ISignUpPageData } from '@/composables/use-api-types';

let activityId: number, activityWorkIds: number[];

const reason = ref('');
const notifyContent = ref('');
const isLoading = ref(true);
const confirmModalVisible = ref(false);
const notifyModalVisible = ref(false);
const toLoginModalVisible = ref(false);
const data = ref<ISignUpPageData>();

const store = useStore();
const contentHeight = useContentHeight();

const handleInputReason = () => handleFieldInput({
  receiver: reason,
  title: '报名原因',
  max: 500,
});

const handleValidate = () => {
  if(store.role === Role.user) {
    notifyContent.value = '您还没完成志愿者认证，请先前往进行认证';
    return notifyModalVisible.value = true;
  };

  if(!reason.value) {
    notifyContent.value = '请填写报名原因';
    return notifyModalVisible.value = true;
  }

  return confirmModalVisible.value = true;
}

const handleSignUp = async () => {
  confirmModalVisible.value = false;
  Taro.showLoading({ title: '提交中' });
  return useSignUp({ activityId, activityWorkIds, reason: reason.value })
    .then(() => {
      Taro.hideLoading();
      setTimeout(() => Taro.showToast({ icon: 'success', title: '报名成功' }), 300);
      Taro.navigateBack();
    })
    .catch(msg => {
      Taro.hideLoading();
      notifyContent.value = msg;
      return notifyModalVisible.value = true;
    })
};

const handleNotifyConfirm = () => {
  if(store.role !== Role.user) return;

  Taro.navigateTo({ url: '/packageB/pages/verify/verify' });
};

useLoad<{ 
  activityId: string;
  activityWorkIds: string;
}>(params => {
  activityId = parseInt(params.activityId);
  activityWorkIds = params.activityWorkIds.split(',').map(id => parseInt(id));
});

useReady(() => {
  if(!store.token) return toLoginModalVisible.value = true;
  
  if(store.role === Role.user) {
    notifyContent.value = '您还没完成志愿者认证，请先前往进行认证';
    return notifyModalVisible.value = true;
  };
  useGetSignUpPageData({ activityId, activityWorkIds }).then(_data => {
    data.value = _data;
    setTimeout(() => isLoading.value = false, 600);
  });
});

useDidShow(() => 
  store.token 
  && (store.role !== Role.user) 
  && !data.value 
  && useGetSignUpPageData({ activityId, activityWorkIds })
    .then(_data => {
      data.value = _data;
      setTimeout(() => isLoading.value = false, 600);
    })
);

</script>

<style lang="scss">
  @use 'sign-up' as *;
</style>