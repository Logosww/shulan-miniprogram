<template>
  <ConfigProvider>
    <Container :navbar-title="title" content-class="bg-[#F7F7F7] pt-[16px]">
      <div class="px-[16px] bg-white relative">
        <textarea class="py-[8px]" placeholder="请输入" style="min-height: 120px; width: 100%" :maxlength="max" :auto-height="true" :focus="true" v-model="content" v-if="!isShortField" />
        <input class="py-[8px]" placeholder="请输入" :maxlength="max" :type="type" :focus="true" v-model="content" v-else />
        <div class="absolute bottom-[12px] right-[16px] text-[#aaa] text-[12px] leading-[14px]">{{ content.length }}/{{ max }}</div>
      </div>
      <div class="absolute bottom-0 left-[16px] right-[16px]">
        <nut-button type="primary" size="large" @tap="handleInput" block>确认</nut-button>
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Taro, { useLoad, getCurrentInstance, navigateBack } from '@tarojs/taro';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';

import type { FieldInputOption } from '@/utils/input';

let channel: Record<string, any>, validator: undefined | ((value: string) => Promise<void>);

const title = ref('');
const content = ref('');
const max = ref(0);
const type = ref('');
const isShortField = ref(true);

const handleInput = async () => {
  if(validator) {
    let err: Error | undefined;
    await validator(content.value).catch<Error>(e => err = e);
    if(err) return Taro.showToast({ icon: 'none', title: err.message });
  }
  channel.emit('input', content.value);
  navigateBack();
};

useLoad(() => {
  const { page } = getCurrentInstance();
  channel = page?.getOpenerEventChannel?.()!;
  channel.on('initialize', (payload: Omit<FieldInputOption, 'receiver'> & { content: string }) => {
    title.value = payload.title;
    content.value = payload.content;
    max.value = payload.max ?? 50;
    type.value = payload.type ? payload.type : 'text';
    isShortField.value = payload.isShortField ?? false;
    validator = payload?.validator;
  });
});
</script>