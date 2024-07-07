<template>
  <div class="py-[10px] bg-white flex justify-between items-center">
    <div class="text-[#262626] text-[14px] font-[500] leading-[16px]">{{ label }}</div>
    <div class="text-[#262626] text-[14px] leading-[16px] flex items-center">
      <div class="mr-[8px]">{{ (formatter ? formatter(value) : value) || (required ? '' : '非必填') }}</div>
      <image class="w-[5px] h-[10px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit" :svg="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
  label: string;
  value?: string | boolean | number | Date;
  formatter?: (val: unknown) => string;
  required?: boolean
}>(), { required: true });
</script>