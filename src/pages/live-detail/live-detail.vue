<template>
  <web-view :src="articleUrl" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useReady, useLoad } from '@tarojs/taro';
import { useGetLiveArticleUrl } from '@/composables';

let liveId: number;

const articleUrl = ref<string>();

useLoad<{ id: number }>(({ id }) => liveId = id);

useReady(() => {
  useGetLiveArticleUrl({ id: liveId }).then(url => articleUrl.value = url);
});

</script>

<style lang="scss">
  @use 'live-detail' as *;
</style>