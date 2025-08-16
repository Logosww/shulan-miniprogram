<template>
  <ConfigProvider>
    <TabPage :active-tab-name="currentTabName" />
    <Tabbar v-model:current="currentTabName" @update:current="handleTabChange" />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, reactive, provide } from 'vue';
import Taro, { useDidShow, useRouter, useShareAppMessage } from '@tarojs/taro';
import { useStore } from '@/store';
import { profileKey } from '@/constants';
import { useThrottleFn } from '@vueuse/core';
import { useGetNotificationCount, useGetUserProfile } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Tabbar from '@/components/tabbar.vue';
import TabPage from '@/components/tab-page.vue';
import { setFormValues } from '@/utils';

import type { IUserProfile } from '@/composables/use-api-types';

const { params } = useRouter();
const currentTabName = ref(params.tab ?? 'home');

const profile = reactive<Omit<IUserProfile, 'desensitizedPhone'>>({
  nickname: '',
  avatarUrl: '',
  activityCompleteCount: void 0,
  volunteerState: void 0,
});

const store = useStore();

const refreshProfile = useThrottleFn(async () => {
  const _profile = await useGetUserProfile();
  setFormValues(profile, _profile, ['avatarUrl']);
  const key = new URL(_profile.avatarUrl).pathname;
  if(!profile.avatarUrl || (key !== new URL(profile.avatarUrl).pathname)) profile.avatarUrl = _profile.avatarUrl;
  store.whitelistState = profile.volunteerState;
}, 2000);

const refreshNotificationCount = useThrottleFn(async () => {
  const notificationCount = await useGetNotificationCount();
  store.$patch({ notificationCount });
}, 2000);

const handleTabChange = (tabName: string) => {
  if(tabName === 'my' && store.token) refreshProfile();
  if(tabName === 'home' || tabName === 'my') refreshNotificationCount();
};

provide(profileKey, profile);

useDidShow(() => {
  refreshProfile();
  refreshNotificationCount();
});
useShareAppMessage(() => ({}));

</script>