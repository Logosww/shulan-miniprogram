<template>
  <Container 
    content-class="px-[16px] pt-[28px]"
    :bg-style="{ backgroundColor: '#F4F4F4' }"
    :mask-style="{
      maskLeftWidth: 394,
      maskLeftHeight: 394,
      maskLeftTop: -213,
      maskLeftLeft: -37,
      maskRightWidth: 353,
      maskRightHeight: 353,
      maskRightTop: -240,
      maskRightRight: -177,
    }"
    background
  >
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="relative w-[60px] h-[60px] mr-[12px]" @tap="isLogin ? Taro.navigateTo({ url: '/pages/profile/profile' }) : void 0">
          <image class="w-full h-full rounded-full overflow-hidden" mode="aspectFill" :src="profile?.avatarUrl" />
          <image class="absolute right-0 bottom-0 w-[16px] h-[16px]" src="@/assets/icon/my/modify.svg" :svg="true" />
        </div>
        <div>
          <div class="text-[#0D0F02] text-[18px] leading-[21px] font-bold flex items-center mb-[4px]" @tap="!isLogin && Taro.navigateTo({ url: '/pages/login/login' })">
            {{ isLogin ? profile?.nickname : '请先登录' }}
            <image class="w-[47px] h-[20px] ml-[2px] flex-shrink-0" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/volunteer_logo.png" v-if="isLogin && role !== Role.user" />
          </div>
          <div v-if="isLogin && role !== Role.user" @tap="handleShowWhitelistModal">
            <div 
              class="inline-block px-[14px] py-[6px] text-[12px] font-[700] text-[#36b23b] bg-[#B0F3B0] rounded-[31px]" 
              v-if="state === VolunteerWhitelistState.normal"
            >
              正常
            </div>
            <div 
              class="inline-block px-[14px] py-[6px] text-[12px] font-[700] text-[#FFAA00] bg-[#FFF9D9] rounded-[31px]"
              v-if="state === VolunteerWhitelistState.whitelist"
            >
              白名单
            </div>
            <div 
              class="inline-block px-[14px] py-[6px] text-[12px] font-[700] text-[#EF660E] bg-[#FEE2D5] rounded-[31px]"
              v-if="state === VolunteerWhitelistState.forbidden"
            >
              禁止报名
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[10px]">
        <image class="w-[25px] h-[25px] mr-[12px]" style="transform: translateY(2px);" src="@/assets/icon/my/scan.svg" :svg="true" @tap="handleCheckin" v-if="true || role && role >= Role.admin" />
        <image class="w-[24px] h-[24px] mr-[5px]" src="@/assets/icon/home/notification.svg" :svg="true" />
      </div>
    </div>
    <div class="banner">
      <image class="w-[97px] h-[60px] absolute bottom-0 left-0 rounded-[16px] overflow-hidden" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/look_activity_history.png" />
      <image class="w-[76px] h-[49px] absolute top-[-22px] left-[37px]" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/wow.png" />
      <div class="absolute top-[8px] left-[102px] text-white leading-[16px] font-[500]">您已累计参加活动</div>
      <div class="absolute bottom-[1px] left-[102px] text-white flex items-baseline">
        <text class="text-[36px] font-[800] leading-[52px] mr-[4px]">{{ isLogin ? profile?.activityCompleteCount : 0 }}</text>
        <text class="font-[500]">次</text>
      </div>
      <div 
        class="absolute right-[20px] top-[50%] w-[72px] h-[30px] leading-[30px] bg-white text-center text-[#0D0F02] text-[16px] font-bold rounded-[34px]"
        style="transform: translateY(-50%);"
        v-if="isLogin && profile?.activityCompleteCount"
      >
        去回顾
      </div>
    </div>
    <div class="my-[16px] px-[27px] py-[14px] bg-white flex items-center rounded-[8px] divide-x divide-[#E6E6E6] divide-solid">
      <div class="flex items-center py-[6px] pr-[26px] border-0" @tap="Taro.navigateTo({ url: '/pages/sign-up-record/sign-up-record' })">
        <image class="w-[28px] h-[28px] mr-[16px]" src="@/assets/icon/my/record.svg" :svg="true" />
        <div>
          <div class="text-[#0D0F02] text-[16px] font-bold leading-[19px] mb-[2px]">报名记录</div>
          <div class="text-[#666] text-[12px] leading-[14px]">查看最近的报名</div>
        </div>
      </div>
      <div class="flex items-center py-[6px] pl-[26px] border-0">
        <image class="w-[28px] h-[28px] mr-[16px]" src="@/assets/icon/my/address.svg" :svg="true" />
        <div>
          <div class="text-[#0D0F02] text-[16px] font-bold leading-[19px] mb-[2px]">地址管理</div>
          <div class="text-[#666] text-[12px] leading-[14px]">共 0 个地址</div>
        </div>
      </div>
    </div>
    <div class="bg-white p-[12px] rounded-[8px]">
      <div class="flex items-center text-[#0D0F02] font-[500] justify-between" @tap="handleCellTap('verify')">
        <div class="flex items-center">
          <image class="w-[24px] h-[24px] mr-[6px]" src="@/assets/icon/my/verify.svg" :svg="true" />
          认证信息
        </div>
        <image class="w-[9px] h-[9px]" src="@/assets/icon/my/right.svg" :svg="true" />
      </div>
      <div class="h-[1px] my-[8px] bg-[#E6E6E6]"></div>
      <div class="flex items-center text-[#0D0F02] font-[500]  justify-between" @tap="handleCellTap('money')">
        <div class="flex items-center">
          <image class="w-[24px] h-[24px] mr-[6px]" src="@/assets/icon/my/money.svg" :svg="true"/>
          酬金情况
        </div>
        <image class="w-[9px] h-[9px]" src="@/assets/icon/my/right.svg" :svg="true" />
      </div>
      <div class="h-[1px] my-[8px] bg-[#E6E6E6]"></div>
      <div class="flex items-center text-[#0D0F02] font-[500]  justify-between" @tap="handleCellTap('feedback')">
        <div class="flex items-center">
          <image class="w-[24px] h-[24px] mr-[6px]" src="@/assets/icon/my/feedback.svg" :svg="true" />
          问题反馈
        </div>
        <image class="w-[9px] h-[9px]" src="@/assets/icon/my/right.svg" :svg="true" />
      </div>
      <div class="h-[1px] my-[8px] bg-[#E6E6E6]" v-if="isLogin"></div>
      <div class="flex items-center text-[#0D0F02] font-[500]  justify-between" @tap="handleCellTap('logout')" v-if="isLogin">
        <div class="flex items-center">
          <image class="w-[24px] h-[24px] mr-[6px]" src="@/assets/icon/my/logout.svg" :svg="true" />
          退出登录
        </div>
        <image class="w-[9px] h-[9px]" src="@/assets/icon/my/right.svg" :svg="true" />
      </div>
    </div>
    <ConfirmModal title="退出登录" v-model="logoutModalVisible" @confirm="handleLogout" v-if="isLogin">
      <div class="text-center text-[#666] text-[12px]">确认退出吗</div>
    </ConfirmModal>
    <Modal v-model="whitelistModalVisible" :wrapper-style="{ padding: 0 }">
      <template #title>
        <div class="w-[280px] bg-[#98FEB5] py-[12px] relative rounded-t-[16px] overflow-visible">
          <image class="w-[111px] h-[136px] absolute bottom-[-17px] right-[-17px]" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/look_question.png" />
          <div class="text-center left-[50%] text-[#0D0F02] font-bold text-[22px] leading-[32px]">
            {{ volunteerWhitelistStateMap[state] }}
          </div>
        </div>
      </template>
      <div class="whitelist-modal-body" v-if="state === VolunteerWhitelistState.normal">
        <div class="state">违规次数</div>
        <div class="expire">{{ whiltelistInfo?.normal.currentViolateCount }}</div>
        <div class="info">
          您当前违规次数已达 {{ whiltelistInfo?.normal.currentViolateCount }} 次，若累计违达 {{ whiltelistInfo?.normal.sysCurrentViolateCount }} 次，后续 {{ whiltelistInfo?.normal.banMonth }} 个月将无法继续报名
        </div>
      </div>
      <div class="whitelist-modal-body" v-if="state === VolunteerWhitelistState.whitelist">
        <div class="state">有效期到期时间</div>
        <div class="expire">{{ moment(whiltelistInfo?.whiteList.expireAt).format('YYYY-MM-DD') }}</div>
        <div class="info">
          您当前的状态属于白名单状态，在有效期之内<br>
          可享受 1 次报名免审核福利
        </div>
      </div>
      <div class="whitelist-modal-body" v-if="state === VolunteerWhitelistState.forbidden">
        <div class="state">解封时间</div>
        <div class="expire is-forbidden">{{ moment(whiltelistInfo?.violateList.releaseAt).format('YYYY-MM-DD') }}</div>
        <div class="info">
          您当前总违规次数为 {{ whiltelistInfo?.violateList.violateCount }} 次，<br>
          于 {{ moment(whiltelistInfo?.violateList.violateAt).format('YYYY 年 M 月 D 日') }} 开启封禁状态，<br>
          封禁期间禁止报名活动
        </div>
      </div>
    </Modal>
  </Container>
</template>

<script lang="ts" setup>
import moment from 'moment';
import { ref, inject, computed } from 'vue';
import { useStore } from '@/store';
import Taro, { useDidShow } from '@tarojs/taro';
import { Role, VolunteerWhitelistState, profileKey, volunteerWhitelistStateMap } from '@/constants';
import { useCheckin, useGetUserProfile, useGetWhitelistInfo, useLogout } from '@/composables';
import Modal from '@/components/modal.vue';
import Container from '@/components/container.vue';
import ConfirmModal from '@/components/confirm-modal.vue';
import { IVolunteerWhitelistInfo } from '@/composables/use-api-types';
import { setFormValues } from '@/utils';

const logoutModalVisible = ref(false);
const whitelistModalVisible = ref(false);
const whiltelistInfo = ref<IVolunteerWhitelistInfo>();

const store = useStore();

const isLogin = computed(() => store.token);
const role = computed(() => store.role);

const profile = inject(profileKey)!;

const state = computed(() => profile.volunteerState ?? 0);

const handleCellTap = (key: string) => {
  if(!isLogin.value) return Taro.showToast({ icon: 'error', title: '你还未登录' });

  switch(key) {
    case 'verify': {
      Taro.navigateTo({ url: '/pages/verify/verify' });
      break;
    }
    case 'money': {
      Taro.navigateTo({ url: '/pages/money/money' });
      break;
    }
    case 'feedback': {
      // Taro.navigateTo({ url: '/pages/feedback/feedback '});
      break;
    }
    case 'logout': {
      logoutModalVisible.value = true;
      break;
    }
  }
};

const handleShowWhitelistModal = async () => {
  whiltelistInfo.value = await useGetWhitelistInfo();
  whitelistModalVisible.value = true;
};

const handleLogout = () => {
  useLogout();
  profile.avatarUrl = '';
  store.$patch({
    token: void 0,
    role: void 0,
  });
  Taro.showToast({ icon: 'success', title: '已退出登录' });
};

const handleCheckin = async () => {
  const { result } = await Taro.scanCode({ scanType: ['qrCode'], onlyFromCamera: true });
  Taro.showLoading({ title: '签到中' });
  const signUpRecordId = parseInt(result);
  await useCheckin({ id: signUpRecordId });
  Taro.hideLoading();
  Taro.showToast({ icon: 'success', title: '签到成功' });
};

useDidShow(() => isLogin.value && useGetUserProfile().then(_profile => {
  setFormValues(profile, _profile, ['avatarUrl']);
  const key = new URL(_profile.avatarUrl).pathname;
  if(key !== new URL(profile.avatarUrl).pathname) profile.avatarUrl = _profile.avatarUrl;
  store.whitelistState = _profile.volunteerState;
}));

</script>

<style lang="scss">
  @use 'my' as *;
</style>