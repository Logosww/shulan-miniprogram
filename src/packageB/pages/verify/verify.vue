<template>
  <ConfigProvider>
    <Container navbar-title="志愿者认证" disable-safe-bottom>
      <my-scroll-view class="bg-[#F7F7F7] px-[16px] box-border" :height="contentHeight" :scroll-into-view="scrollTo">
        <div class="mt-[24px] text-[#0D0F02] text-[20px] leading-[28px] font-bold">请扫描身份证件的正反面</div>
        <div class="mt-[4px] mb-[10px] text-[#0D0F02] leading-[20px] font-bold">正面为头像面</div>
        <div class="flex items-baseline">
          <image class="w-[12px] h-[12px] mr-[6px]" src="@/assets/icon/verify/tip.svg" mode="aspectFit" :svg="true" />
          <div class="text-[#0D0F02] text-[12px] leading-[17px]">请保证二代身份证（或港澳台通行证、护照）有效，并且头像文字清晰，四角对齐，无反光，无遮挡</div>
        </div>
        <div class="id-card"
          @tap="uploadImage(1, ([path], [key]) => (form.idCardNationalPath = path) && (idCardNationalKey = key), form.idCardNationalPath, !!form.idCardNationalPath)">
          <div class="id-card__circle" v-show="!form.idCardNationalPath">
            <image class="id-card__icon-plus" src="@/assets/icon/verify/plus.svg" mode="aspectFit" :svg="true" />
          </div>
          <image class="picture" mode="aspectFill" :src="form.idCardNationalPath" v-show="form.idCardNationalPath" />
        </div>
        <div class="mt-[12px] text-[#0D0F02] text-[16px] leading-[22px] font-[500] text-center">{{
          form.idCardNationalPath ? '身份证件正面已上传，不支持修改' : '点击上传身份证件的正面' }}</div>
        <div class="id-card"
          @tap="uploadImage(1, ([path], [key]) => (form.idCardPortraitPath = path) && (idCardPortraitKey = key), form.idCardPortraitPath, !!form.idCardPortraitPath)">
          <div class="id-card__circle" v-show="!form.idCardPortraitPath">
            <image class="id-card__icon-plus" src="@/assets/icon/verify/plus.svg" mode="aspectFit" :svg="true" />
          </div>
          <image class="picture" mode="aspectFill" :src="form.idCardPortraitPath" v-show="form.idCardPortraitPath" />
        </div>
        <div class="mt-[12px] text-[#0D0F02] text-[16px] leading-[22px] font-[500] text-center">{{
          form.idCardPortraitPath ? '身份证件反面已上传，不支持修改' : '点击上传身份证件的反面' }}</div>
        <div class="flex items-center mt-[24px] mb-[16px]">
          <div class="checkbox"></div>
          <div class="text-[#0D0F02] text-[18px] leading-[25px] font-[500]">请核对身份信息</div>
        </div>
        <div class="mb-[24px] space-y-[24px]">
          <div class="flex justify-between leading-[22px] text-[16px]">
            <div class="text-[#0D0F02] font-bold">姓名</div>
            <!-- <div class="text-[#ccc]">待证件扫描后自动录入</div> -->
            <div class="flex text-[#404040] items-center" @tap="!form.name && handleFieldInput({
              title: '姓名',
              isShortField: true,
              max: 20,
              receiver: { form, field: 'name' },
              validator: nameValidator,
            })">
              <div class="text-[#ccc]" v-show="!form.name">请输入中文</div>
              {{ form.name }}
              <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                :svg="true" />
            </div>
          </div>
          <div class="flex justify-between leading-[22px] text-[16px]">
            <div class="text-[#0D0F02] font-bold">性别</div>
            <picker header-text="性别" :range="genderRange"
              @change="({ detail: { value } }) => form.sex = parseInt(value)">
              <div class="flex text-[#404040] items-center">
                <div class="text-[#ccc]" v-show="form.sex === void 0">请选择</div>
                {{ genderMap[form.sex] }}
                <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                  :svg="true" />
              </div>
            </picker>
          </div>
          <div class="flex justify-between leading-[22px] text-[16px]">
            <div class="text-[#0D0F02] font-bold">年龄</div>
            <div class="flex text-[#404040] items-center"
              @tap="handleFieldInput({ title: '年龄', isShortField: true, max: 3, type: 'number', receiver: { form, field: 'age' }, validator: ageValidator })">
              <div class="text-[#ccc]" v-show="form.age === void 0">请输入</div>
              {{ form.age }}
              <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                :svg="true" />
            </div>
          </div>
          <div class="flex justify-between leading-[22px] text-[16px]">
            <div class="text-[#0D0F02] font-bold">证件类型</div>
            <picker header-text="证件类型" :range="idCardTypeRange"
              @change="({ detail: { value } }) => form.idCardType = parseInt(value)"
              :disabled="form.idCardType !== void 0">
              <div class="flex text-[#404040] items-center">
                <div class="text-[#ccc]" v-show="form.idCardType === void 0">请选择</div>
                {{ idCardTypeMap[form.idCardType] }}
                <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                  :svg="true" />
              </div>
            </picker>
          </div>
          <div class="flex justify-between leading-[22px] text-[16px]">
            <div class="text-[#0D0F02] font-bold">证件号码</div>
            <!-- <div class="text-[#ccc]">待证件扫描后自动录入</div> -->
            <div class="flex text-[#404040] items-center"
              @tap="!form.idCard && handleFieldInput({ title: '证件号', isShortField: true, max: 18, receiver: { form, field: 'idCard' } })">
              <div class="text-[#ccc]" v-show="!form.idCard">请输入</div>
              {{ form.idCard }}
              <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                :svg="true" />
            </div>
          </div>
          <!-- <div class="flex justify-between leading-[22px] text-[16px]">
            <div class="text-[#0D0F02] font-bold">有效期</div>
            <div class="text-[#ccc]">待证件扫描后自动录入</div>
            <picker mode="date" fields="month" header-text="身份证有效期" @change="({ detail: { value } }) => form.schoolDate = value">
              <div class="flex text-[#404040]">
                <div class="text-[#ccc]" v-show="form.">请选择</div>
                {{  }}
                <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit" :svg="true" />
              </div>
            </picker>
          </div> -->
          <div class="flex justify-between leading-[22px] text-[16px]">
            <div class="text-[#0D0F02] font-bold">户籍</div>
            <div class="flex text-[#404040] items-center"></div>
            <picker mode="region" level="city" :value="form.householdRegister"
              @change="({ detail: { value } }) => form.householdRegister = value">
              <div class="flex text-[#404040] items-center">
                <div class="text-[#ccc]" v-show="!form.householdRegister.length">请选择</div>
                {{ form.householdRegister.join('') }}
                <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                  :svg="true" />
              </div>
            </picker>
          </div>
        </div>
        <div class="bg-white rounded-[16px] overflow-hidden">
          <div class="tabs">
            <div class="tabs-item" :class="[form.identity === VolunteerIdentity.student ? 'is-active' : '']"
              @tap="form.identity = VolunteerIdentity.student">学生身份</div>
            <div class="tabs-item" :class="[form.identity === VolunteerIdentity.socialFigure ? 'is-active' : '']"
              @tap="form.identity = VolunteerIdentity.socialFigure">社会人士</div>
          </div>
          <div class="tab-pane">
            <div class="form-cell is-required">
              证件照片
              <div class="flex text-[#404040] leading-[20px] items-center"
                @tap="uploadImage(1, ([path], [key]) => (form.idPhotoPath = path) && (idPhotoKey = key), form.idPhotoPath)">
                <div class="text-[#ccc]" v-show="!form.idPhotoPath">请上传一寸人像照片原件</div>
                {{ form.idPhotoPath ? '已上传' : '' }}
                <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                  :svg="true" />
              </div>
            </div>
            <div v-show="form.identity === VolunteerIdentity.student">
              <div class="form-cell is-required">
                学校名称
                <div class="flex text-[#404040] leading-[20px] items-center"
                  @tap="handleFieldInput({ title: '学校名称', isShortField: true, max: 30, receiver: { form, field: 'school' } })">
                  <div class="text-[#ccc]" v-show="!form.school">请填写您的学校名称</div>
                  <div class="max-w-[200px] truncate" v-show="form.school">{{ form.school }}</div>
                  <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg"
                    mode="aspectFit" :svg="true" />
                </div>
              </div>
              <div class="form-cell is-required">
                专业
                <div class="flex text-[#404040] leading-[20px] items-center"
                  @tap="handleFieldInput({ title: '专业名称', isShortField: true, max: 30, receiver: { form, field: 'major' } })">
                  <div class="text-[#ccc]" v-show="!form.major">请填写您的专业名称</div>
                  <div class="max-w-[200px] truncate" v-show="form.major">{{ form.major }}</div>
                  <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg"
                    mode="aspectFit" :svg="true" />
                </div>
              </div>
              <picker header-text="年级" :range="gradeRange"
                @change="({ detail: { value } }) => form.grade = gradeRange[value]">
                <div class="form-cell is-required">
                  年级
                  <div class="flex text-[#404040] leading-[20px] items-center">
                    <div class="text-[#ccc]" v-show="!form.grade">请选择您的年级</div>
                    <div class="max-w-[200px] truncate" v-show="form.grade">{{ form.grade }}</div>
                    <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg"
                      mode="aspectFit" :svg="true" />
                  </div>
                </div>
              </picker>
              <div class="form-cell is-required">
                学生证
                <div class="flex text-[#404040] leading-[20px] items-center"
                  @tap="uploadImage(5, (_, keys) => form.studentCardPaths = keys, form.studentCardPaths)">
                  <div class="text-[#ccc]" v-show="!form.studentCardPaths.length">5张以内照片</div>
                  {{ form.studentCardPaths.length ? '已上传' : '' }}
                  <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg"
                    mode="aspectFit" :svg="true" />
                </div>
              </div>
              <div class="form-cell is-required" id="student-verify-auth">
                身份认证
                <div class="flex text-[#404040] leading-[20px] items-center" @tap="!form.isStudentVerified && (studentVerifyModalVisible = true)">
                  <div class="text-[#ccc]" v-show="!form.isStudentVerified">去认证</div>
                  {{ form.isStudentVerified ? '已认证' : '' }}
                  <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg"
                    mode="aspectFit" :svg="true" />
                </div>
              </div>
            </div>
            <div v-show="form.identity === VolunteerIdentity.socialFigure">
              <div class="form-cell is-required">
                毕业学校
                <div class="flex text-[#404040] leading-[20px] items-center"
                  @tap="handleFieldInput({ title: '学校名称', isShortField: true, max: 30, receiver: { form, field: 'graduateSchool' } })">
                  <div class="text-[#ccc]" v-show="!form.graduateSchool">请填写您的毕业学校</div>
                  <div class="max-w-[200px] truncate" v-show="form.graduateSchool">{{ form.graduateSchool }}</div>
                  <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg"
                    mode="aspectFit" :svg="true" />
                </div>
              </div>
              <div class="form-cell">
                入职单位
                <div class="flex text-[#404040] leading-[20px] items-center"
                  @tap="handleFieldInput({ title: '单位名称', isShortField: true, max: 30, receiver: { form, field: 'jobUnit' } })">
                  <div class="text-[#ccc]" v-show="!form.jobUnit">请填写您的入职单位，选填</div>
                  <div class="max-w-[200px] truncate" v-show="form.jobUnit">{{ form.jobUnit }}</div>
                  <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg"
                    mode="aspectFit" :svg="true" />
                </div>
              </div>
              <div class="form-cell">
                入职单位证明
                <div class="flex text-[#404040] leading-[20px] items-center"
                  @tap="uploadImage(5, (_, keys) => form.joinUnitPaths = keys, form.joinUnitPaths)">
                  <div class="text-[#ccc]" v-show="!form.joinUnitPaths.length">5张以内照片，选填</div>
                  {{ form.joinUnitPaths.length ? '已上传' : '' }}
                  <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg"
                    mode="aspectFit" :svg="true" />
                </div>
              </div>
            </div>
            <div class="form-cell is-required">
              相关经历
              <div class="flex text-[#404040] leading-[20px] items-center"
                @tap="handleFieldInput({ title: '相关经历', max: 500, receiver: { form, field: 'experience' } })">
                <div class="text-[#ccc]" v-show="!form.experience">请填写您的相关经历</div>
                <div class="max-w-[200px] truncate" v-show="form.experience">{{ form.experience }}</div>
                <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                  :svg="true" />
              </div>
            </div>
            <div class="form-cell">
              相关经历证明
              <div class="flex text-[#404040] leading-[20px] items-center"
                @tap="uploadImage(5, (_, keys) => form.experiencePaths = keys, form.experiencePaths)">
                <div class="text-[#ccc]" v-show="!form.experiencePaths.length">5张以内照片，选填</div>
                {{ form.experiencePaths.length ? '已上传' : '' }}
                <image class="w-[5px] h-[10px] ml-[8px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit"
                  :svg="true" />
              </div>
            </div>
          </div>
        </div>
        <div class="h-[120px]"></div>
        <root-portal>
          <div class="action-bar" v-if="store.role === Role.user">
            <div
              class="text-[#41CC68] text-[16px] leading-[44px] font-[500] rounded-[37px] px-[23px] border-[#41CC68] border-[1px] border-solid"
              @tap="setFormValues(form, initialValues)">清空填写信息</div>
            <div class="text-[#0D0F02] text-[16px] leading-[44px] font-bold rounded-[37px] bg-[#51FE81] px-[74px]"
              @tap="handleSubmit">
              确认
            </div>
          </div>
          <div class="action-bar" v-else>
            <!-- <div class="text-[#41CC68] text-[16px] leading-[44px] font-[500] rounded-[37px] px-[23px] border-[#41CC68] border-[1px] border-solid" @tap="cancelConfirmVisible = true">取消认证信息</div>
            <div class="text-[#0D0F02] text-[16px] leading-[44px] font-bold rounded-[37px] bg-[#51FE81] px-[42px]" @tap="modifyConfirmVisible = true">
              修改认证信息
            </div> -->
            <div
              class="text-[#0D0F02] text-[16px] leading-[44px] font-bold rounded-[37px] bg-[#51FE81] text-center w-full"
              @tap="handleModify">
              修改认证信息
            </div>
          </div>
        </root-portal>
      </my-scroll-view>
      <!-- <ConfirmModal title="取消认证信息" v-model="cancelConfirmVisible" v-if="store.role !== Role.user" @confirm="handleCancel">
        <div class="text-[#666] text-[12px] leading-[17px] text-center">身份认证一旦取消认证，原先记录将会丢失，无法找回</div>
      </ConfirmModal> -->
      <ConfirmModal title="温馨提示" v-model="notifyModalVisible" just-notify @confirm="handleNotifyConfirm">
        <div class="text-[#666] text-[12px] leading-[17px] text-center whitespace-pre-line">{{ notifyContent }}</div>
      </ConfirmModal>
    </Container>
  </ConfigProvider>
  <student-verify @auth="handleStudentVerifyAuth" @reject="handleStudentVerifyReject" @close="studentVerifyModalVisible = false"
    :show="studentVerifyModalVisible" :is-quick="true"></student-verify>
</template>

<script lang="ts" setup>
import moment from 'moment';
import { ref, reactive } from 'vue';
import { setFormValues, isUrl, handleFieldInput } from '@/utils';
import { Role, VolunteerIdentity, genderMap, idCardTypeMap } from '@/constants';
import {
  useCOS,
  useContentHeight,
  useGetVerifyData,
  useVerifyStudentAuth,
  useVerifyVolunteer,
  // useCancelVerify,
} from '@/composables';
import Taro, { useLoad } from '@tarojs/taro';
import { useStore } from '@/store';
import { useThrottleFn } from '@vueuse/core';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import ConfirmModal from '@/components/confirm-modal.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { IVerifyForm as _IVerifyForm, IVerifyData } from '@/composables/use-api-types';

type IVerifyForm = _IVerifyForm & { graduateSchool?: string };

const emptyForm: IVerifyForm = {
  name: '',
  idCard: '',
  school: '',
  grade: '',
  major: '',
  jobUnit: '',
  idPhotoPath: '',
  experience: '',
  graduateSchool: '',
  joinUnitPaths: [],
  experiencePaths: [],
  studentCardPaths: [],
  idCardNationalPath: '',
  idCardPortraitPath: '',
  identity: VolunteerIdentity.student,
  // @ts-ignore
  idCardType: void 0,
  // @ts-ignore
  sex: void 0,
  // @ts-ignore
  age: void 0,
  isStudentVerified: false,
  householdRegister: [],
};
const initialValues: IVerifyForm = { ...emptyForm };

let idPhotoKey = '', idCardNationalKey = '', idCardPortraitKey = '', isNotifyingVerifyStudent = false, shouldNotifyStudentVerify = true;

const idCardTypeRange = Object.values(idCardTypeMap), genderRange = Object.values(genderMap);

let thisYear = moment().year() - (moment().month() >= 6 ? 2000 : 2001);
const gradeRange: string[] = [];
for (let i = 16; i <= thisYear; i++) gradeRange.push(`${i}级`);

const notifyContent = ref('');
const notifyModalVisible = ref(false);
const studentVerifyModalVisible = ref(false);
const scrollTo = ref<string>();
const form = reactive<IVerifyForm>(emptyForm);

const store = useStore();
const contentHeight = useContentHeight();
const { upload } = useCOS();

store.role === Role.volunteer && useGetVerifyData().then(data => {
  setFormValues(form, data);
  data.identity === VolunteerIdentity.student ? (form.school = data.school) : (form.graduateSchool = data.school);
  form.idPhotoPath = data.idPhotoUrl;
  form.joinUnitPaths = data.joinUnitUrls;
  form.experiencePaths = data.experienceUrls;
  form.studentCardPaths = data.studentCardUrls;
  form.idCardNationalPath = data.idCardNationalUrl;
  form.idCardPortraitPath = data.idCardPortraitUrl;

  checkStudentIdentity(data);
});

const ageValidator = (value: string) => {
  const age = parseInt(value);

  if (isNaN(age)) return Promise.reject(new Error('请输入数字'));

  if (age < 0 || age > 150) return Promise.reject(new Error('请输入正确的年龄'));

  return Promise.resolve();
};

const uploadImage = async (count = 1, callback?: (filePaths: string[], keys: string[]) => void, url?: string | string[], readonly?: boolean) => {
  const _upload = async () => {
    const { tempFiles } = await Taro.chooseMedia({
      count,
      mediaType: ['image'],
      sizeType: ['compressed', 'compressed'],
    });
    const filePaths: string[] = [];
    for (let file of tempFiles) {
      const { size, tempFilePath } = file;
      if (size >= 1024 * 1024) {
        // image file limit: 1 MB
        Taro.showToast({
          icon: 'error',
          title: '图片大小不可超过 1 MB',
        });
        throw new Error(`Image file size exceed: ${tempFilePath}, ${size} B`);
      }
      filePaths.push(tempFilePath);
    }
    doUpload(filePaths).then(keys => callback?.(filePaths, keys));
  };

  if (readonly) {
    url && Taro.previewImage({ urls: Array.isArray(url) ? url : [url] });
    return;
  }

  const { tapIndex } = await Taro.showActionSheet({ itemList: ['查看原图', '上传图片'] });
  switch (tapIndex) {
    case 0:
      url && Taro.previewImage({ urls: Array.isArray(url) ? url : [url] });
      break;
    case 1:
      _upload();
      break;
  }
};

const doUpload = async (filePaths: string[]) => {
  Taro.showLoading({ title: '上传中' });
  const keys = await Promise.all(filePaths.map(_filePath => upload(_filePath)));
  Taro.hideLoading();
  Taro.showToast({ icon: 'success', title: '上传成功' });
  return keys;
};

const transform = () => {
  const _form = { ...form };
  _form.age = form.age >= 150 ? 150 : form.age;
  _form.idPhotoPath = idPhotoKey ? idPhotoKey : new URL(form.idPhotoPath).pathname.slice(1);
  _form.idCardNationalPath = idCardNationalKey ? idCardNationalKey : new URL(form.idCardNationalPath).pathname.slice(1);
  _form.idCardPortraitPath = idCardPortraitKey ? idCardPortraitKey : new URL(form.idCardPortraitPath).pathname.slice(1);
  _form.joinUnitPaths = form.joinUnitPaths.map(path => isUrl(path) ? new URL(path).pathname.slice(1) : path);
  _form.experiencePaths = form.experiencePaths.map(path => isUrl(path) ? new URL(path).pathname.slice(1) : path);
  _form.studentCardPaths = form.studentCardPaths.map(path => isUrl(path) ? new URL(path).pathname.slice(1) : path);
  if (_form.identity === VolunteerIdentity.socialFigure) {
    _form.school = _form.graduateSchool!;
    _form.major = _form.grade = '';
    _form.studentCardPaths = [];
  } else {
    _form.jobUnit = '';
    _form.joinUnitPaths = [];
  }
  delete _form.graduateSchool;
  return _form as _IVerifyForm;
};

const validate = () => {
  if (!(form.name && form.idCard && form.age && form.householdRegister.length && form.experience && form.idPhotoPath && (form.sex !== void 0) && (form.idCardType !== void 0) && form.idCardNationalPath && form.idCardPortraitPath)) return false;

  if (form.identity === VolunteerIdentity.student) {
    if (!(form.school && form.grade && form.major && form.studentCardPaths.length)) return false;
    return true;
  } else if (!form.graduateSchool) return false;
  return true;
};

const handleModify = async () => {
  if (!validate()) {
    notifyContent.value = '请核对表单信息是否完整，\n并补充必填的表单项';
    return notifyModalVisible.value = true;
  }

  Taro.showLoading({ title: '提交中' });
  return useVerifyVolunteer(transform())
    .then(() => {
      Taro.hideLoading();
      store.role = Role.volunteer;
      setTimeout(() => Taro.showToast({ icon: 'success', title: '修改成功' }), 300);
      Taro.navigateBack();
    })
    .catch(msg => {
      Taro.hideLoading();
      notifyContent.value = msg;
      notifyModalVisible.value = true;
    });
};

// const handleCancel = () => useCancelVerify().then(() => {
//   store.role = Role.user;
//   setTimeout(() => Taro.showToast({ icon: 'success', title: '取消成功' }), 300);
//   Taro.navigateBack();
// }).catch(msg => {
//     notifyContent.value = msg;
//     notifyModalVisible.value = true;
//   });

const checkStudentPluginForUpdate = () => {
  // @ts-expect-error
  if (!Taro.getPluginUpdateManager || !Taro.getUpdateManager) return;

  // @ts-expect-error
  const pluginManager = Taro.getPluginUpdateManager({ pluginId: '' }) as any;
  const weappManager = Taro.getUpdateManager();
  pluginManager.onUpdateReady(weappManager.applyUpdate());
  pluginManager.onUpdateFailed(console.error);
};

const checkStudentIdentity = (data: IVerifyData) => {
  if (store.role !== Role.volunteer || data.identity !== VolunteerIdentity.student) return;

  if (!data.isStudentVerified) {
    if (shouldNotifyStudentVerify) {
      setTimeout(() => {
        isNotifyingVerifyStudent = true;
        notifyContent.value = '检测到您是学生，请先完成学生认证';
        notifyModalVisible.value = true;
      }, 500);
    } else scrollTo.value = 'student-verify-auth';
  }
};

const doVerifyStudentAuth = useThrottleFn(async () => {
  if (!store.studentcheckCode) return;

  Taro.showLoading({ title: '认证中' });
  const isVerified = await useVerifyStudentAuth({ wxStudentCheckCode: store.studentcheckCode }).catch(() => {
    Taro.hideLoading();
    store.setStudentcheckCode(void 0);
    Taro.showToast({ icon: 'error', title: '认证失败' });
  });

  Taro.hideLoading();
  if (isVerified) {
    form.isStudentVerified = true;
    Taro.showToast({ icon: 'success', title: '认证成功' });
  } else {
    store.setStudentcheckCode(void 0);
    Taro.showToast({ icon: 'error', title: '认证失败' });
  }
}, 1000);

const handleStudentVerifyAuth = (e: { detail: { wx_studentcheck_code: string } }) => {
  const { detail: { wx_studentcheck_code: code } } = e;
  if (!code) return Taro.showToast({ icon: 'error', title: '学生认证失败' });

  store.setStudentcheckCode(code);
  doVerifyStudentAuth();
};

const handleStudentVerifyReject = () => {
  Taro.showToast({ icon: 'error', title: '取消认证' });
};

const handleNotifyConfirm = () => {
  if (isNotifyingVerifyStudent && shouldNotifyStudentVerify) {
    scrollTo.value = 'student-verify-auth';
    isNotifyingVerifyStudent = false;
  }
};

useLoad(({ notifyDisabled }) => {
  checkStudentPluginForUpdate();
  notifyDisabled && (shouldNotifyStudentVerify = false);
});

const handleSubmit = async () => {
  if (!validate()) {
    notifyContent.value = '请核对表单信息是否完整，\n并补充必填的表单项';
    return notifyModalVisible.value = true;
  }

  Taro.showLoading({ title: '提交中' });

  return useVerifyVolunteer(transform())
    .then(() => {
      store.role = Role.volunteer;
      Taro.hideLoading();
      setTimeout(() => Taro.showToast({ icon: 'success', title: '认证成功' }), 300);
      Taro.navigateBack();
    })
    .catch(msg => {
      Taro.hideLoading();
      notifyContent.value = msg;
      notifyModalVisible.value = true;
    });
};

const nameValidator = (value: string) => /^[\u4e00-\u9fff]+$/.test(value) ? Promise.resolve() : Promise.reject(new Error('请输入中文'));
</script>

<style lang="scss">
@use 'verify' as *;
</style>