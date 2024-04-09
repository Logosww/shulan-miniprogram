<template>
  <div class="bg-white px-[16px]">
    <FieldCell label="姓名" :value="form.name" @tap="showInputModal('name', '姓名')" />
    <picker class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" mode="selector" header-text="性别" :range="['男', '女']" @change="({ detail: { value } }) => form.gender = genderRange[value]">
      <FieldCell label="性别" :value="form.gender"></FieldCell>
    </picker>
    <picker class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" mode="date" fields="month" header-text="出生年月" @change="handleBirthChange">
      <FieldCell label="年龄" :value="form.age" />
    </picker>
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="手机号" />
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="证件照片" />
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="身份证号" />
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="学生证" />
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="学校名称" @tap="showInputModal('school', '学校名称')" />
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="学号" @tap="showInputModal('studentNumber', '学号')" />
    <picker class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" mode="date" fields="month" header-text="入学时间" @change="({ detail: { value } }) => form.schoolDate = value">
      <FieldCell label="入学时间" :value="form.schoolDate" />
    </picker>
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="相关经历证明" />
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="报名本次活动的原因" :required="false" />
    <FieldCell class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" label="电子邮箱" :value="form.email" @tap="showInputModal('email', '电子邮箱')" />
    <picker class="border-0 border-t-[1px] border-[#E6E6E6] border-solid" mode="region" header-text="现居住地" @change="({ detail: { value } }) => form.address = value.join('')">
      <FieldCell label="现居住地" :value="form.address" />
    </picker>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import Taro from '@tarojs/taro';
import moment from 'moment';
import FieldCell from './field-cell.vue';

const genderRange = ['男', '女'];

const form = reactive({
  name: '',
  gender: '',
  age: '',
  phone: '',
  schoolDate: '',
  email: '',
  address: '',
})

const showInputModal = (field: string, label: string) => Taro.showModal({
  //@ts-ignore
  editable: true,
  title: label,
  placeholderText: '请输入',
  //@ts-ignore
  success({ confirm, content }) {
    if(!confirm || !content) return;

    form[field] = content;
  },
});

const handleBirthChange = ({ detail: { value } }) => {
  const now = moment();
  const birth = moment(value as string);
  if(birth.isAfter(now)) return;

  const duration = moment.duration(now.diff(birth));
  const age = Math.floor(duration.asYears()).toString();
  form.age = (age ? age : 1).toString();
};
</script>