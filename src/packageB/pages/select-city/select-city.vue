<template>
  <ConfigProvider>
    <Container navbar-title="选择城市" disable-safe-bottom>
      <!-- <div class="p-[16px] bg-[#F7F7F7] flex items-center">
        <div class="relative h-[30px] pl-[10px] pr-[8px] flex items-center flex-[1] rounded-[20px] border-[1px] border-solid border-[#B3B3B3]">
          <image class="w-[16px] h-[16px]" src="@/assets/icon/select-city/search.svg" mode="aspectFit" :svg="true" />
          <div class="relative flex-[1] h-[16px] ml-[14px]">
            <div class="absolute left-0 top-0 w-full h-full text-[#B3B3B3] text-[12px] leading-[16px]" v-show="!searchContent && !isSearchboxFocused">城市</div>
            <input class="search-box__original" type="text" v-model="searchContent" @focus="isSearchboxFocused = true" @blur="isSearchboxFocused = false" />
          </div>
          <image class="w-[16px] h-[16px]" src="@/assets/icon/select-city/clear.svg" mode="aspectFit" :svg="true" v-show="searchContent" />
        </div>
        <div class="pl-[12px] text-[14px] text-[#0D0F02] leading-[20px] font-[500]" v-show="isSearchboxFocused">取消</div>
      </div> -->
      <Elevator :data="cityList" v-if="cityList.length" @select="handleSelectCity">
        <div class="p-[16px] pt-[12px] pb-[4px] bg-white">
          <div class="text-[#404040] text-[12px] leading-[14px] mb-[7px]">定位城市</div>
          <div class="city-option" @tap="currentCity && handleSelectCity(currentCity)">{{ currentCity || '定位中...' }}</div>
        </div>
        <sticky-section>
          <sticky-header>
            <div class="text-[12px] text-[#666] py-[9px] pl-[16px] bg-[#F7F7F7]">推荐访问</div>
          </sticky-header>
          <grid-view class="bg-white" :cross-axis-count="3" :cross-axis-gap="12" :main-axis-gap="12" :padding="[16, 47, 16, 16]">
            <div class="city-option" @tap="handleSelectCity('北京')">北京</div>
            <div class="city-option" @tap="handleSelectCity('上海')">上海</div>
            <div class="city-option" @tap="handleSelectCity('深圳')">深圳</div>
            <div class="city-option" @tap="handleSelectCity('广州')">广州</div>
            <div class="city-option" @tap="handleSelectCity('重庆')">重庆</div>
            <div class="city-option" @tap="handleSelectCity('天津')">天津</div>
            <div class="city-option" @tap="handleSelectCity('成都')">成都</div>
            <div class="city-option" @tap="handleSelectCity('西安')">西安</div>
            <div class="city-option" @tap="handleSelectCity('哈尔滨')">哈尔滨</div>
          </grid-view>
        </sticky-section>
      </Elevator>
      <nut-empty  v-else />
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import Taro, { useLoad } from '@tarojs/taro';
import { ref } from 'vue';
import { useStore } from '@/store';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import Elevator from '@/components/elevator.vue';

import type { IElevatorDataItem } from '@/components/elevator.vue';

const currentCity = ref('');
const cityList = ref<IElevatorDataItem[]>([]);

const store = useStore();

const handleSelectCity = (city: string) => {
  store.selectCity(city);
  Taro.navigateBack();
};

useLoad(() => {
  Taro.showLoading({ title: '加载中' });
  const { preloadData } = Taro.getCurrentInstance();
  if(!preloadData) return;

  const { cityList: _cityList, currentCity: _currentCity } = preloadData as { cityList: IElevatorDataItem[]; currentCity?: string };
  cityList.value = _cityList;
  currentCity.value = _currentCity ?? '';
  Taro.nextTick(Taro.hideLoading);
});
</script>

<style lang="scss">
  @use './select-city' as *;
</style>