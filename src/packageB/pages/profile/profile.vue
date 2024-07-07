<template>
  <ConfigProvider>
    <Container navbar-title="基本信息" content-class="bg-[#F7F7F7]">
      <div class="mx-auto pt-[32px] relative w-[120px] h-[120px]" @tap="handleUploadAvatar">
        <image class="w-full h-full rounded-full overflow-hidden" :src="profile.avatarUrl" />
        <image class="w-[28px] h-[28px] absolute bottom-[8px] right-0" src="@/assets/icon/profile/camera.svg" mode="aspectFit" :svg="true" />
      </div>
      <div class="p-[16px] flex justify-between text-[16px] leading-[22px] mt-[32px]">
        <div class="text-[#262626]">昵称</div>
        <div class="flex text-[#666] items-center" @tap="handleModifyNickname">
          {{ profile.nickname }}
          <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit" :svg="true" />
        </div>
      </div>
      <div class="p-[16px] flex justify-between text-[16px] leading-[22px]">
        <div class="text-[#262626]">手机号</div>
        <div class="flex text-[#666] items-center">{{ profile.desensitizedPhone }}</div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-[16px] pb-0 bg-white">
        <nut-button size="large" type="primary" @tap="handleSubmit" block>保存资料</nut-button>
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { useCOS, useGetUserPartialProfile, useModifyUserPartialProfile } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';

import type { IUserProfile } from '@/composables/use-api-types';

let avatarPath = '';
const profile = ref<Omit<IUserProfile, 'volunteerState' | 'activityCompleteCount'>>({
  avatarUrl: '',
  nickname: '',
  desensitizedPhone: '',
});

const { upload } = useCOS();

const handleUploadAvatar = async () => {
  const { tempFiles: [{ tempFilePath }]} = await Taro.chooseMedia({ count: 1, mediaType: ['image'], sizeType: ['compressed'] });
  const { tempFilePath: filePath } = await Taro.cropImage({ src: tempFilePath, cropScale: '1:1' });
  Taro.showLoading({ title: '上传中' });
  avatarPath = await upload(filePath);
  Taro.hideLoading();
  profile.value.avatarUrl = filePath;
  Taro.showToast({ icon: 'success', title: '上传成功' });
};

const handleModifyNickname = () => Taro.showModal({
  title: '昵称',
  //@ts-ignore
  editable: true,
  placeholderText: '请输入',
  //@ts-ignore
  success({ confirm, content }) {
    if(!confirm || !content) return;

    profile.value.nickname = content;
  }
});

const handleSubmit = async () => {
  await useModifyUserPartialProfile({
    avatarPath, 
    nickname: profile.value.nickname,
  });
  setTimeout(() => Taro.showToast({ icon: 'success', title: '保存成功' }), 300);
  Taro.navigateBack();
};

useGetUserPartialProfile().then(_profile => {
  profile.value = _profile;
  avatarPath = new URL(profile.value.avatarUrl).pathname.slice(1);
});
</script>

<style lang="scss">
  @use 'profile' as *;
</style>