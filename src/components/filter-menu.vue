<template>
  <div class="menu-bar">
    <div 
      :class="['menu-item', currentFilterIndex === index ? 'is-active' : '']"
      v-for="(item, index) in config"
      :key="index"
      @tap="handleShowPopup(index)"
    >
      <div 
        :class="['menu-item__title', item.filterKey && item.filterType === 'option' && (values[item.filterKey!] !== void 0) ? 'has-value' : '']"
      >
        {{ item.filterKey && item.filterType === 'option' &&  typeof values[item.filterKey!] !== 'undefined' ? titles[item.filterKey!] : item.title }}
      </div>
      <image class="menu-item__icon" src="@/assets/icon/live/down.svg" :svg="true" v-if="item.filterType !== 'all' || item.hideIcon" />
    </div>
    <div class="menu-item-popup" v-for="(item, index) in config" :key="index" v-show="popupWrapperVisible[index]">
      <nut-popup
        position="top"
        v-model:visible="popupVisible[index]"
        :style="{ position: 'absolute', backgroundColor: '#F7F7F7' }"
        :overlay-style="{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, .6)' }"
        :destroy-on-close="false"
        :catch-move="true"
        @close="currentFilterIndex = -1"
        @closed="popupWrapperVisible[index] = false"
        v-if="item.filterType !== 'all'"
      >
        <div class="p-[16px] flex flex-wrap justify-normal gap-[10px]" v-if="item.filterType === 'option'">
          <div 
            :class="['menu-item-option', values[item.filterKey!] === option.value ? 'is-active' : '']"
            v-for="(option, _index) in item.filterOptions"
            :key="_index"
            @tap="handleToggleOption(item.filterKey!, option)"
          >
            {{ option.title }}
          </div>
        </div>
        <nut-calendar-card
          type="range"
          :start-date="moment().toDate()"
          :end-date="moment().add(6, 'M').toDate()"
          @change="val => handleDateRangeChange(val, item.filterKey!)"
          v-else
        />
      </nut-popup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment';
import { ref, reactive, watch } from 'vue';

interface IFilterOption {
  title: string;
  value: unknown;
};

export interface IFilterItemConfig {
  title: string;
  filterType: 'all' | 'option' | 'daterange';
  filterKey?: string;
  filterOptions?: IFilterOption[];
  hideIcon?: boolean;
  disableToggle?: boolean;
};

const props = defineProps<{ config: IFilterItemConfig[] }>();
const emit = defineEmits<{ 'change': [values: Record<string, unknown>] }>();

const allFilterIndex = props.config.findIndex(({ filterType }) => filterType === 'all');
const currentFilterIndex = ref(allFilterIndex);
const popupVisible = ref<boolean[]>(Array(props.config.length).fill(false));
const popupWrapperVisible = ref<boolean[]>(Array(props.config.length).fill(false));

const _values: Record<string, unknown> = {};
const _titles: Record<string, string | undefined> = {};
props.config.forEach(({ filterKey }) => filterKey && (_values[filterKey] = _titles[filterKey] = void 0));

const values = reactive(_values);
const titles = reactive(_titles);

const handleShowPopup = (index: number) => {
  if(index === currentFilterIndex.value) {
    const visible = popupWrapperVisible.value[index];
    if(visible) return popupVisible.value[index] = !visible;
  }
  
  popupWrapperVisible.value[currentFilterIndex.value] 
    = popupVisible.value[currentFilterIndex.value] 
    = false;
  currentFilterIndex.value = index;
  if(props.config[index].filterType === 'all') {
    Object.keys(values).forEach(key => values[key] = void 0);
    return;
  }
  
  popupWrapperVisible.value[index] = popupVisible.value[index] = true;
};

const handleToggleOption = (key: string, option: IFilterOption) => {
  const { disableToggle } = props.config.find(({ filterKey }) => filterKey = key)!;
  const { title, value } = option;
  const _value = values[key], _title = titles[key];
  if(!disableToggle && typeof _value !== 'undefined') _value === value ? (values[key] = void 0) : (values[key] = value);
  else values[key] = value;
  if(!disableToggle && _title) _title === title ? (titles[key] = void 0) : (titles[key] = title);
  else titles[key] = title;
};

const handleDateRangeChange = (val: Date[], filterKey: string) => {
  if(val.length === 1) return;

  if(!val.length) values[filterKey] = void 0;
  else values[filterKey] = val.map(date => moment(date).format('YYYY-MM-DD'));
  const visible = popupWrapperVisible.value[currentFilterIndex.value];
  popupVisible.value[currentFilterIndex.value] = !visible;
};

const setFilterOption = async (filterKey: string, value: unknown) => {
  const config = props.config.find(({ filterKey: key }) => key === filterKey);
  if(!config) return;

  const option = config.filterOptions?.find(({ value: val }) => val === value);
  if(!option) return;

  const { title } = option;
  _values[filterKey] = value, _titles[filterKey] = title;
};

watch(values, () => emit('change', values), { deep: false });

defineExpose({
  setFilterOption,
});
</script>

<style lang="scss">
  @use '../assets/style/components/filter-menu' as *;
</style>