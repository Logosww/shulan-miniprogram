<template>
  <ConfigProvider>
    <Container
      :mask-style="{
        maskLeftWidth: 633,
        maskLeftHeight: 560,
        maskLeftTop: -200,
        maskLeftLeft: -358,
        maskRightWidth: 312,
        maskRightHeight: 251,
        maskRightTop: -95,
        maskRightRight: -116,
      }"
      background
    >
      <image class="fixed w-[257px] h-[323px] top-[12px] right-0" src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp%2Flogin_sms_chahua.png" />
      <div class="px-[22px] mt-[23px] flex flex-col items-center">
        <div class="w-full text-[44px] font-[800] leading-[52px] text-[#0D0F02]">HI!</div>
        <div class="w-full text-[22px] font-bold leading-[28px] text-[#0D0F02] mb-[74px]">你的手机号是？</div>
        <div class="input-wrapper">
          <div class="input-label">+86</div>
          <nut-input type="number" max-length="13" placeholder="手机号" v-model="formattedPhone" :border="false" :formatter="phoneFormatter" />
        </div>
        <div class="input-wrapper">
          <div class="input-label">验证码</div>
          <nut-input type="number" max-length="6" placeholder="输入验证码" v-model="code" :border="false">
            <template #right>
              <div class="send-code-btn" v-show="!isCodeSent" @tap="handleSendCode">获取验证码</div>
              <div class="send-code-btn" v-show="isCodeSent">{{ countdown }}s</div>
            </template>
          </nut-input>
        </div>
        <nut-button class="my-[6px]" type="primary" size="large" :disabled="!(formattedPhone && code)" @tap="handleLogin" block>登录</nut-button>
        <nut-checkbox class="mt-[243px]" icon-size="12" v-model="isAgreeAccords">
          <text class="text-[#b3b3b3] text-[10px] leading-[14px]">
            我已阅读并同意 树懒<text class="text-[#666]" @tap="Taro.navigateTo({ url: '/packageC/pages/statement/statement' })">《用户协议》</text>和<text class="text-[#666]" @tap="Taro.navigateTo({ url: '/packageC/pages/statement/statement' })">《隐私政策》</text>
          </text>
        </nut-checkbox>
      </div>
    </Container>
    <ConfirmModal v-model="isShowAccords" :close-on-click-overlay="false" title="服务协议及隐私保护" cancel-btn-title="不同意" confirm-btn-title="同意" @confirm="isAgreeAccords = true">
      <div class="text-center text-[#666] text-[12px]">
        {{ '为了更好地保障您的合法权益，请您阅读并同意以下协议\n' }}
        <div class="text-[#0D0F02]" @tap.self="Taro.navigateTo({ url: '/packageC/pages/statement/statement' })">《用户协议》《隐私协议》</div>
      </div>
    </ConfirmModal>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSendSmsCode, useSmsLogin } from '@/composables';
import Taro from '@tarojs/taro';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import ConfirmModal from '@/components/confirm-modal.vue';
import { useStore } from '@/store';

let countdownTimer: number, startTime: number, realPhone = '';

const isShowAccords = ref(false);
const isAgreeAccords = ref(false);
const isCodeSent = ref(false);
const countdown = ref(60);
const formattedPhone = ref('');
const code = ref('');

const store = useStore();

const phoneFormatter = (phone: string) => {
  realPhone = phone;
  return phone.replace(/^(\d{3})(\d{4})(\d+)$|^(\d{3})(\d{1,4})$/g, (_, s1, s2, s3, s4, s5) => {
    s1 = s4 || s1, s2 = s5 || s2, s3 = s3 || '';
    s2 && (s1 += ' ');
    s3 && (s2 += ' ');

    return s1 + s2 + s3;
  });
};

const countdownTick = () => {
  countdownTimer = requestAnimationFrame(timestamp => {
    if(!startTime) startTime = timestamp;

    if(timestamp - startTime >= 1000) {
      startTime = timestamp;
      countdown.value--;
      if(countdown.value === 0) {
        isCodeSent.value = false;
        countdown.value = 60;
        cancelAnimationFrame(countdownTimer);
      }
    }

    countdownTick();
  })
}

const handleSendCode = async () => {
  if(!realPhone) return;
  
  if(!/^(13[0-9]|14[5-9]|15[0-3,5-9]|16[6]|17[0-8]|18[0-9]|19[0-9])\d{8}$/.test(realPhone))
    return Taro.showToast({ icon: 'none', title: '无效手机号，请重新核对' });

  await useSendSmsCode({ purePhoneNumber: realPhone });
  isCodeSent.value = true;
  countdownTick();
};

const doLogin = () => {
  if(!(realPhone && code.value)) return;

  Taro.showLoading({ title: '登录中' });
  Taro.login({
    async success({ code: wxmpCode }) {
      const result = await useSmsLogin({
        wxmpCode,
        purePhoneNumber: realPhone,
        smsCode: code.value,
      });
      store.$patch(result);
      Taro.hideLoading();
      setTimeout(() => Taro.showToast({ icon: 'success', title: '登录成功' }), 300);
      Taro.navigateBack({ delta: 2 });
    },
    fail: () => Taro.showToast({ icon: 'error', title: '登录失败' }),
  })
};

const handleLogin = () => {
  if(!isAgreeAccords.value) return isShowAccords.value = true;

  doLogin();
};
</script>

<style lang="scss">
  @use 'login-sms' as *;
</style>