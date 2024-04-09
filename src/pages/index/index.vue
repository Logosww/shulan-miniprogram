<template>
  <ConfigProvider>
    <TabPage :active-tab-name="currentTabName" />
    <Tabbar v-model:current="currentTabName" @update:current="handleTabChange" />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, reactive, provide } from 'vue';
import { useRouter, useShareAppMessage } from '@tarojs/taro';
import { useStore } from '@/store';
import { profileKey } from '@/constants';
import { useThrottleFn } from '@vueuse/core';
import { useGetUserProfile } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Tabbar from '@/components/tabbar.vue';
import TabPage from '@/components/tab-page.vue';

import type { IUserProfile } from '@/composables/use-api-types';
import { setFormValues } from '@/utils';

const { params } = useRouter();
const currentTabName = ref(params.tab ?? 'home');

const profile = reactive<Omit<IUserProfile, 'desensitizedPhone'>>({
  nickname: '',
  avatarUrl: '',
  activityCompleteCount: void 0,
  volunteerState: void 0,
});

const store = useStore();

const handleTabChange = useThrottleFn(async (tabName: string) => {
  if(tabName === 'my' && store.token) {
    const _profile = await useGetUserProfile();
    setFormValues(profile, _profile, ['avatarUrl']);
    const key = new URL(_profile.avatarUrl).pathname;
    if(key !== new URL(profile.avatarUrl).pathname) profile.avatarUrl = _profile.avatarUrl;
    store.whitelistState = profile.volunteerState;
  }
}, 3000);

provide(profileKey, profile);

useShareAppMessage(() => ({}));

</script>