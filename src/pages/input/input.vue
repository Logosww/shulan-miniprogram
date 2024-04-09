<template>
  <ConfigProvider>
    <Container :navbar-title="title" content-class="bg-[#F7F7F7] pt-[16px]">
      <nut-textarea placeholder="请输入" :max-length="max" :autosize="{ minHeight: 120 }" v-model="content" limit-show autofocus v-if="!isShortField" />
      <nut-input placeholder="请输入" :max-length="max" :type="type" v-model="content" show-word-limit clearable autofocus v-else />
      <div class="absolute bottom-0 left-[16px] right-[16px]">
        <nut-button type="primary" size="large" @tap="handleInput" block>确认</nut-button>
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useLoad, getCurrentInstance, navigateBack } from '@tarojs/taro';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';

import type{ InputType } from '@nutui/nutui-taro/dist/types/__VUE/input/type';

let channel: Record<string, any>;

const title = ref('');
const content = ref('');
const max = ref(0);
const type = ref<InputType>();
const isShortField = ref(false);

const handleInput = () => {
  channel.emit('input', content.value);
  navigateBack();
};

useLoad(() => {
  const { page } = getCurrentInstance();
  channel = page?.getOpenerEventChannel?.()!;
  channel.on('initialize', (payload: { 
    title: string;
    content: string;
    max?: number;
    type?: InputType;
    isShortField?: boolean;
  }) => {
    title.value = payload.title;
    content.value = payload.content;
    max.value = payload.max ?? 50;
    type.value = payload.type ? payload.type : 'text';
    isShortField.value = payload.isShortField ?? false;
  });
});
</script>