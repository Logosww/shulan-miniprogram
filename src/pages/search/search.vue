<template>
  <ConfigProvider>
    <Container navbar-title="搜索" disable-safe-bottom>
      <div class="w-full px-[16px] py-[8px] bg-white box-border">
        <div class="flex items-center">
          <div class="relative box-border h-[32px] pl-[10px] pr-[8px] py-[8px] flex items-center flex-[1] rounded-[20px] border-[1px] border-solid border-[#8ECCA0] bg-gradient-to-r from-[rgba(192,245,0,0.1)] from-0% to-[rgba(81,254,129,0.1)] to-100%">
            <image class="w-[16px] h-[16px]" src="@/assets/icon/search/search.svg" :svg="true" />
            <div class="relative flex-[1] h-[16px] ml-[14px]">
              <div class="absolute left-0 top-0 w-full h-full text-[#8ECCA0] text-[12px] leading-[16px]" v-show="!searchContent && !isSearchboxFocused">周杰伦</div>
              <input class="search-box__original" type="text" v-model="searchContent" @focus="isSearchboxFocused = true" @blur="isSearchboxFocused = false" />
            </div>
          </div>
          <div class="pl-[12px] text-[14px] text-[#0D0F02] leading-[20px] font-[500]" v-show="isSearchboxFocused">取消</div>
        </div>
      </div>
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="全部" pane-key="all">
          <scroll-view
            class="bg-[#F4F4F4]"
            :style="scrollViewStyle"
            :enhanced="true"
            :enable-passive="true"
            :scroll-y="true"
            :show-scrollbar="false"
            :fast-deceleration="true"
          >
            <div class="mt-[16px] px-[10px] bg-white divide-y divide-[#E6E6E6] divide-solid">
              <!-- <ActivityCard class="py-[10px]" block /> -->
            </div>
            <div class="mt-[16px] px-[10px] bg-white divide-y divide-[#E6E6E6] divide-solid">
              <!-- <ActivityCard class="py-[10px]" block /> -->
            </div>
            <div class="mt-[16px] h-[100px] text-[#B3B3B3] text-[12px] leading-[14px] text-center">{{ `“${searchContent}”的相关搜索只有这么多啦` }}</div>
          </scroll-view>
        </nut-tab-pane>
        <nut-tab-pane title="演出" pane-key="show">
          <scroll-view 
            class="bg-[#F4F4F4]"
            :style="scrollViewStyle"
            :enhanced="true"
            :enable-passive="true"
            :scroll-y="true"
            :show-scrollbar="false"
            :fast-deceleration="true"
          >
            <div class="mt-[16px] px-[10px] bg-white divide-y divide-[#E6E6E6] divide-solid">
              <!-- <ActivityCard class="py-[10px]" block /> -->
            </div>
            <div class="mt-[16px] h-[100px] text-[#B3B3B3] text-[12px] leading-[14px] text-center">{{ `“${searchContent}”的相关搜索只有这么多啦` }}</div>
          </scroll-view>
        </nut-tab-pane>
        <nut-tab-pane title="现场回顾" pane-key="live">
          <scroll-view 
            class="bg-[#F4F4F4]"
            :style="scrollViewStyle"
            :enhanced="true"
            :enable-passive="true"
            :scroll-y="true"
            :show-scrollbar="false"
            :fast-deceleration="true"
          >
            <div class="mt-[16px] px-[10px] bg-white divide-y divide-[#E6E6E6] divide-solid">
              <!-- <ActivityCard class="py-[10px]" block /> -->
            </div>
            <div class="mt-[16px] h-[100px] text-[#B3B3B3] text-[12px] leading-[14px] text-center">{{ `“${searchContent}”的相关搜索只有这么多啦` }}</div>
          </scroll-view>
        </nut-tab-pane>
      </nut-tabs>
      <div class="search-history-wrapper" v-show="isSearchboxFocused">
        <div class="flex justify-between mb-[10px]">
          <div class="text-[#0D0F02] text-[14px] leading-[16px] font-[500]">搜索历史</div>
          <image class="w-[12px] h-[12px]" src="@/assets/icon/search/delete.svg" :svg="true" v-if="searchHistory.length" />
        </div>
        <div class="flex flex-wrap" v-if="searchHistory.length">
          <div 
            class="py-[6px] px-[20px] mr-[16px] mb-[8px] box-border text-center text-[#262626] text-[12px] leading-[14px] bg-[#FAFAFA] max-w-[122px] truncate rounded-[4px] border-[1px] border-solid border-[#E6E6E6]"
            v-for="(item, index) in searchHistory"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="text-[12px] text-[#B3B3B3]" v-else>未找到搜索历史</div>
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store';
import { useContentHeight } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
// import ActivityCard from '@/components/activity-card.vue';

const store = useStore();

const isSearchboxFocused = ref(false);
const searchContent = ref('');
const activeTab = ref('all');
const searchHistory = ref<string[]>(store.searchHistory ?? []);

const contentHeight = useContentHeight();

const scrollViewStyle = computed(() => `height: ${contentHeight.value - 90}px`);

</script>

<style lang="scss">
  @use './search' as *;
</style>