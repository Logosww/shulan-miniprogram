<template>
  <ConfigProvider>
    <Container navbar-title="选择城市" disable-safe-bottom>
      <!-- <div class="p-[16px] bg-[#F7F7F7] flex items-center">
        <div class="relative h-[30px] pl-[10px] pr-[8px] flex items-center flex-[1] rounded-[20px] border-[1px] border-solid border-[#B3B3B3]">
          <image class="w-[16px] h-[16px]" src="@/assets/icon/select-city/search.svg" :svg="true" />
          <div class="relative flex-[1] h-[16px] ml-[14px]">
            <div class="absolute left-0 top-0 w-full h-full text-[#B3B3B3] text-[12px] leading-[16px]" v-show="!searchContent && !isSearchboxFocused">城市</div>
            <input class="search-box__original" type="text" v-model="searchContent" @focus="isSearchboxFocused = true" @blur="isSearchboxFocused = false" />
          </div>
          <image class="w-[16px] h-[16px]" src="@/assets/icon/select-city/clear.svg" :svg="true" v-show="searchContent" />
        </div>
        <div class="pl-[12px] text-[14px] text-[#0D0F02] leading-[20px] font-[500]" v-show="isSearchboxFocused">取消</div>
      </div> -->
      <Elevator :data="cityList" v-if="cityList.length" @select="handleSelectCity">
        <div class="p-[16px] pt-[12px] pb-[4px] bg-white">
          <div class="text-[#404040] text-[12px] leading-[14px] mb-[7px]">定位城市</div>
          <div class="city-option" @tap="currentCity && handleSelectCity(currentCity)">{{ currentCity || '定位中...' }}</div>
        </div>
        <div class="text-[12px] text-[#666] py-[9px] pl-[16px] bg-[#F7F7F7]">推荐访问</div>
        <div class="bg-white p-[16px] pb-[4px] flex flex-wrap">
          <div class="city-option" v-for="(city, index) in recommendCity" :key="index" @tap="handleSelectCity(city)">{{ city }}</div>
        </div>
      </Elevator>
      <nut-empty  v-else />
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { useStore } from '@/store';
import { useCOS, useDecodeGeography } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import Elevator from '@/components/elevator.vue';

import type { IElevatorDataItem } from '@/components/elevator.vue';

const currentCity = ref('');
const cityList = ref<IElevatorDataItem[]>([]);
const recommendCity = [
  '北京',
  '上海',
  '深圳',
  '广州',
  '重庆',
  '天津',
  '成都',
  '西安',
  '哈尔滨',
];


const store = useStore();
const { downloadAndRead } = useCOS();

const initialize = async () => {
  Taro.showLoading({ title: '加载中' });
  cityList.value = await downloadAndRead<IElevatorDataItem[]>({ key: 'cityList.json', jsonParse: true })
    .then(({ data: cityList }) => cityList)
    .finally(() => Taro.nextTick(
      () => setTimeout(() => Taro.hideLoading())
    ));
      
  const { authSetting } = await Taro.getSetting();
  if(!authSetting['scope.userFuzzyLocation']) return;

  Taro.getFuzzyLocation({
    type: 'wgs84',
    success: async params => store.city = currentCity.value = await useDecodeGeography(params), 
  });
};

const handleSelectCity = (city: string) => {
  store.selectCity(city);
  Taro.navigateBack();
};

initialize();
</script>

<style lang="scss">
  @use './select-city' as *;
</style>