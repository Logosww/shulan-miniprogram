<template>
  <ConfigProvider>
    <Container background>
      <div class="px-[28px] mt-[48px] flex flex-col items-center">
        <image src="@/assets/image/logo.png" class="w-[90px] h-[68px]" />
        <image src="//common-1323578300.cos.ap-shanghai.myqcloud.com/shulan-wxmp/login_chahua.png" class="w-[320px] h-[320px]" />
        <nut-button 
          class="my-[16px]"
          type="primary"
          size="large"
          :open-type="isAgreeAccords && 'getPhoneNumber'"
          @tap="!isAgreeAccords && (isShowAccords = true)"
          @getphonenumber="handleMobileLogin"
          block
          >
          本机号码一键登录
        </nut-button>
        <div class="mt-[16px] text-[#808080] font-medium leading-[16px]" @tap="Taro.navigateTo({ url: '/pages/login-sms/login-sms' })">使用其他手机号登录</div>
        <nut-checkbox class="mt-[107px]" icon-size="12" v-model="isAgreeAccords">
          <text class="text-[#b3b3b3] text-[10px] leading-[14px]">
            我已阅读并同意 树懒<text class="text-[#666]" @tap="Taro.navigateTo({ url: '/pages/statement/statement' })">《用户协议》</text>和<text class="text-[#666]" @tap="Taro.navigateTo({ url: '/pages/statement/statement' })">《隐私政策》</text>
          </text>
        </nut-checkbox>
      </div>
    </Container>
    <ConfirmModal v-model="isShowAccords" title="服务协议及隐私保护" cancel-btn-title="不同意" confirm-btn-title="同意" @confirm="isAgreeAccords = true">
      <div class="text-center text-[#666] text-[12px]">
        {{ '为了更好地保障您的合法权益，请您阅读并同意以下协议\n' }}
        <div class="text-[#0D0F02]" @tap.self="Taro.navigateTo({ url: '/pages/statement/statement' })">《用户协议》《隐私政策》</div>
      </div>
    </ConfirmModal>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMobileLogin } from '@/composables';
import Taro from '@tarojs/taro';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import ConfirmModal from '@/components/confirm-modal.vue';
import { useStore } from '@/store';

const isShowAccords = ref(false);
const isAgreeAccords = ref(false);

const store = useStore();

const handleMobileLogin = ({ detail: { code: phoneCode } }) => {
  if(!phoneCode) return;

  Taro.showLoading({ title: '登录中' });
  Taro.login({
    async success({ code: wxmpCode }) {
      const result = await useMobileLogin({ phoneCode, wxmpCode });
      store.$patch(result);
      Taro.hideLoading();
      Taro.navigateBack();
      setTimeout(() => Taro.showToast({ icon: 'success', title: '登录成功' }), 300);
    },
    fail: () => Taro.showToast({ icon: 'error', title: '登录失败' }),
  });
};

</script>

<style lang="scss">
  @use 'login' as *;
</style>
