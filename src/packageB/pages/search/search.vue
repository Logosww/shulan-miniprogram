<template>
  <ConfigProvider>
    <Container navbar-title="搜索" content-class="bg-[#F4F4F4]" disable-safe-bottom>
      <div class="w-full px-[16px] py-[8px] bg-white box-border">
        <div class="flex items-center">
          <div class="relative box-border h-[32px] pl-[10px] pr-[8px] py-[8px] flex items-center flex-[1] rounded-[20px] border-[1px] border-solid border-[#8ECCA0] bg-gradient-to-r from-[rgba(192,245,0,0.1)] from-0% to-[rgba(81,254,129,0.1)] to-100%">
            <image class="w-[16px] h-[16px]" src="@/assets/icon/search/search.svg" :svg="true" />
            <div class="relative flex-[1] h-[16px] ml-[14px]">
              <input ref="inputRef" class="search-box__original" type="text" confirm-type="search" :focus="true" v-model="searchContent" @focus="isSearchboxFocused = true" @blur="isSearchboxFocused = false" @confirm="handleSearch" />
            </div>
          </div>
          <div class="pl-[12px] text-[14px] text-[#0D0F02] leading-[20px] font-[500]" @tap="inputRef?.blur()" v-show="isSearchboxFocused">取消</div>
        </div>
      </div>
      <div class="relative h-full pt-[8px] overflow-y-auto">
        <div v-if="result.length && searchContent">
          <div class="divide-y divide-[#E6E6E6] divide-solid px-[12px] bg-white">
            <ActivityCard v-for="(item, index) in result" :key="index" :data="item" block />
          </div>
          <div class="text-[#B3B3B3] text-[12px] leading-[17px] text-center mt-[16px]">“{{ searchContent }}”的相关搜索结果只有这么多啦~</div>
          <div class="h-[200px]"></div>
        </div>
        <nut-empty description="暂无结果" v-else />
        <div class="search-history-wrapper" v-show="isSearchboxFocused">
          <div class="flex justify-between mb-[10px]">
            <div class="text-[#0D0F02] text-[14px] leading-[16px] font-[500]">搜索历史</div>
            <image class="w-[12px] h-[12px]" src="@/assets/icon/search/delete.svg" :svg="true" @tap="store.searchHistory = []" v-if="store.searchHistory?.length" />
          </div>
          <div class="flex flex-wrap" v-if="store.searchHistory?.length">
            <div 
              class="py-[6px] px-[20px] mr-[16px] mb-[8px] box-border text-center text-[#262626] text-[12px] leading-[14px] bg-[#FAFAFA] max-w-[122px] truncate rounded-[4px] border-[1px] border-solid border-[#E6E6E6]"
              v-for="(item, index) in store.searchHistory"
              :key="index"
              @tap="(searchContent = item) && handleSearch()"
            >
              {{ item }}
            </div>
          </div>
          <div class="text-[12px] text-[#B3B3B3]" v-else>未找到搜索历史</div>
        </div>
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { ref } from 'vue'
import { useStore } from '@/store';
import { useSearchActivities } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import ActivityCard from '@/components/activity-card.vue';

import type { IActivityPreview } from '@/composables';

const store = useStore();

const inputRef = ref<HTMLInputElement>()
const isSearchboxFocused = ref(false);
const searchContent = ref('');
const result = ref<IActivityPreview[]>([]);

const handleSearch = async () => {
  Taro.showLoading({ title: '加载中' });

  result.value = await useSearchActivities({ keyword: searchContent.value });
  Taro.hideLoading();
  (!store.searchHistory?.includes(searchContent.value)) && store.searchHistory?.push(searchContent.value);
};

</script>

<style lang="scss">
  @use './search' as *;
</style>