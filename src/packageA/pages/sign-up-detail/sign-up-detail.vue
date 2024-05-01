<template>
  <ConfigProvider>
    <Container navbar-title="报名详情" content-class="bg-[#50FE82]" :bg-style="{ backgroundColor: '#50FE82' }" disable-safe-bottom>
      <div class="relative h-full rounded-t-[16px] overflow-hidden">
        <div class="bg-white absolute box-border w-full h-full p-[16px] space-y-[40px] skeleton" v-if="isLoading">
          <div>
            <nut-skeleton avatar-size="96px" avatar-shape="square" row="3" height="16px" width="280px" avatar animated round />
          </div>
          <div>
            <nut-skeleton row="3" height="16px" width="398px" animated round />
          </div>
          <div>
            <nut-skeleton row="2" height="16px" width="398px" animated round />
          </div>
          <div>
            <nut-skeleton row="3" height="16px" width="398px" animated round />
          </div>
          <div>
            <nut-skeleton row="2" height="16px" width="398px" animated round />
          </div>
          <div>
            <nut-skeleton row="3" height="16px" width="398px" animated round />
          </div>
        </div>
        <my-scroll-view
          class="bg-[#F7F7F7] animation-fade-in"
          :height="contentHeight"
          :refresh-handler="getPageData"
          refresher
          v-else
        >
          <div>
            <div class="px-[16px] py-[20px] bg-white mb-[16px]">
              <div class="flex">
                <image class="w-[94px] h-[128px] rounded-[12px] mr-[12px] flex-shrink-0" mode="aspectFill" :src="data?.activity.coverUrl" @tap="coverPreviewerVisible = true" />
                <div class="flex flex-col justify-between">
                  <div class="text-[#0D0F02] text-[14px] font-bold leading-[16px]">
                    {{ data?.activity.city }} |【{{ data && activityTypeMap[data.activity.type] }}】{{ data?.activity.name }}
                  </div>
                  <div class="text-[12px] text-[#666] leading-[17px]">
                    <div class="text-[#404040] font-bold mb-[2px]">
                      {{ data?.activityWorkVolunteerIdentity === VolunteerType.normal ? data.work.name : '其他' }}
                    </div>
                    <div class="flex items-center" v-if="data?.activityWorkVolunteerIdentity === VolunteerType.normal">
                      <image class="w-[12px] h-[12px] mr-[4px] flex-shrink-0" src="@/assets/icon/home/time.svg" :svg="true" />
                      工作时间：
                    </div>
                    <div v-if="data?.activityWorkVolunteerIdentity === VolunteerType.normal">
                      {{ moment(data?.work.startAt).format('YYYY.MM.DD HH:mm') }}—{{ moment(data?.work.endAt).format('YYYY.MM.DD HH:mm') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-[12px] h-[1px] bg-[#E6E6E6]"></div>
              <div class="text-[#0D0F02] text-[16px] leading-[22px] flex justify-between">
                活动酬金
                <div class="flex items-center">
                  ￥{{ data?.work.money }}
                  <image class="w-[14px] h-[14px] ml-[16px] mr-[4px]" src="@/assets/icon/integral.svg" :svg="true" />
                  +{{ data?.work.integral }}
                </div>
              </div>
              <div class="my-[12px] h-[1px] bg-[#E6E6E6]"></div>
              <div class="flex justify-between items-center">
                <div>
                  <div class="flex items-center mb-[4px]">
                    <image class="w-[14px] h-[14px] mr-[8px]" src="@/assets/icon/home/position.svg" :svg="true" />
                    <div class="text-[14px] leading-[16px] text-[#0D0F02] font-[500]">{{ data?.activity.city }} | {{ data?.activity.address }}</div>
                  </div>
                  <div class="text-[12px] text-[#808080] leading-[14px]">{{ data?.activity.addressDetailVo.detail }}</div>
                </div>
                <image class="w-[28px] h-[28px]" src="@/assets/icon/activity-detail/navigation.svg" :svg="true" @tap="handleOpenLocation" />
              </div>
              <div class="my-[12px] h-[1px] bg-[#E6E6E6]"></div>
              <div class="flex justify-between items-center" @tap="anouncementModalVisible = true">
                <div class="flex items-center">
                  <image class="w-[36px] h-[20px] mr-[12px]" src="@/assets/icon/activity-detail/notice.svg" :svg="true" />
                  <div class="text-[#0D0F02] text-[14px] leading-[16px] max-w-[252px] truncate">话剧团（用于发布组织方附加公告须知）</div>
                </div>
                <image class="w-[5px] h-[10px]" src="@/assets/icon/activity-detail/right.svg" :svg="true" />
              </div>
            </div>
            <div class="bg-white py-[20px] px-[16px] mb-[16px]">
              <image class="w-[92px] h-[15px] mb-[12px]" src="@/assets/icon/sign-up-detail/check-in.svg" :svg="true" />
              <div class="mb-[4px] text-[#0D0F02] text-[16px] leading-[22px] font-bold">志愿者编号</div>
              <div class="text-[#0D0F02] text-[24px] leading-[34px] font-bold">{{ data?.id }}{{ data?.checkin && data?.checkin.isChecked ? '（已签到）' : '' }}</div>
              <div class="mt-[4px]" v-if="data?.checkin && !data?.checkin.isChecked">
                <div class="mb-[12px] text-[#B3B3B3] text-[12px] leading-[17px]">请在给活动工作人员进行扫码签到</div>
                <div class="text-center text-[#0D0F02] text-[20px] font-bold leading-[28px] mb-[8px]">志愿者二维码签到</div>
                <image class="block mx-auto w-[200px] h-[200px]" mode="aspectFill" :src="data?.checkin.qrCodeBase64" />
              </div>
            </div>
            <div class="p-[16px] bg-white mb-[16px]">
              <div class="flex items-end mb-[12px]">
                <image class="w-[75px] h-[15px] mr-[8px]" src="@/assets/icon/activity-detail/safeguard.svg" :svg="true" />
                <div class="text-[#666] text-[12px] leading-[14px]">本活动所可以提供的保障</div>
              </div>
              <div class="flex space-x-[18px] overflow-x-scroll flex-nowrap features">
                <div class="flex flex-col items-center" v-if="data?.activity.features.includes(ActivityFeature.insurance)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/insurance.svg" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">免费保险</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.activity.features.includes(ActivityFeature.meal)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/meal.svg" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">餐食补贴</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.activity.features.includes(ActivityFeature.clothes)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/clothes.svg" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">工作马甲</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.activity.features.includes(ActivityFeature.money)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/money.svg" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">工资补贴</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.activity.features.includes(ActivityFeature.band)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/band.svg" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">工作手环</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.activity.features.includes(ActivityFeature.water)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/water.svg" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">饮用水</div>
                </div>
              </div>
            </div>
            <div id="detail" class="bg-white px-[16px] py-[20px] mb-[16px]">
              <div class="py-[12px] text-[#0D0F02] text-[16px] leading-[19px] font-bold">演出描述</div>
              <div class="text-[#0D0F02] text-[14px] leading-[16px] whitespace-pre-line">{{ data?.activity.description }}</div>
              <div class="my-[12px] text-[#0D0F02] text-[16px] leading-[19px] font-bold">工作介绍</div>
              <div class="pl-[16px] text-[#666] text-[14px] leading-[16px]">
                <div class="text-[#0D0F02] space-y-[8px] mt-[12px]">
                  <div class="font-bold">{{ data?.activityWorkVolunteerIdentity === VolunteerType.normal ? data.work.name : '其他' }}</div>
                  <div class="flex" v-if="data?.activityWorkVolunteerIdentity === VolunteerType.normal">
                    <div class="font-[500] mr-[4px] whitespace-nowrap">工作详情：</div>
                    {{ data?.work.description }}
                  </div>
                  <div class="flex" v-if="data?.activityWorkVolunteerIdentity === VolunteerType.normal">
                    <div class="font-[500] mr-[4px] whitespace-nowrap">工作时间：</div>
                    <div class="text-[#404040]">
                      {{ moment(data?.work.startAt).format('YYYY.MM.DD HH:mm') }} — {{ moment(data?.work.endAt).format('YYYY.MM.DD HH:mm') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="notice" class="bg-white p-[16px] mb-[16px]" v-if="data?.activity.isWorkInstruction">
              <div class="text-[#0D0F02] text-[16px] font-bold leading-[19px] mb-[4px]">工作须知</div>
              <ul class="space-y-[12px] px-[8px]">
                <li class="text-[14px] leading-[18px]">
                  <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#D9D9D9] before:rounded-full">自愿加入活动志愿者团队，配合活动的管理安排。</div>
                </li>
                <li class="text-[14px] leading-[18px]">
                  <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#D9D9D9] before:rounded-full">请确保能按时到岗并全程参与志愿者服务，我们只接受全程参与的志愿者。</div>
                </li>
                <li class="text-[14px] leading-[18px]">
                  <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#D9D9D9] before:rounded-full">志愿者录取情况我们会以短信或电话等方式逐一通知所有录取者，报名后请保持通讯畅通。</div>
                </li>
                <li class="text-[14px] leading-[18px]">
                  <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#D9D9D9] before:rounded-full">活动期间工作期间表现不佳、中途退出或请假将被取消志愿者资格，无法获得福利。</div>
                </li>
                <li class="text-[14px] leading-[18px]">
                  <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#D9D9D9] before:rounded-full">须服从组织安排，按时到岗。</div>
                </li>
              </ul>
              <div class="text-[#39B25B] text-[12px] leading-[14px] text-center" @tap="noticePopupVisible = true">全部11条工作须知</div>
            </div>
          </div>
          <div class="h-[32px]"></div>
        </my-scroll-view>
        <Popup title="工作须知" :content-height="500" v-model="noticePopupVisible" v-if="data?.activity.isWorkInstruction">
          <ul class="space-y-[12px] px-[8px]">
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">自愿加入活动志愿者团队，配合活动的管理安排。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">请确保能按时到岗并全程参与志愿者服务，我们只接受全程参与的志愿者。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">志愿者录取情况我们会以短信或电话等方式逐一通知所有录取者，报名后请保持通讯畅通。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">活动期间工作期间表现不佳、中途退出或请假将被取消志愿者资格，无法获得福利。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">须服从组织安排，按时到岗。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">珍惜和维护活动的声誉，不得利用志愿者身份从事与活动活动宗旨、目的不符的行为。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">有责任感、团队精神，积极主动与人沟通交流，良好的心理素质及执行能力。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">若被列入志愿者黑名单将永久不能再报名树懒接下来的所有演出活动志愿者。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">不得擅自与艺人进行合影、摄像及索要签名。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">性别不限，年龄18岁以上。</div>
            </li>
            <li class="text-[14px] leading-[18px]">
              <div class="text-[#0D0F02] mb-[4px] relative before:absolute before:content-[''] before:left-[-8px] before:my-[6px] before:w-[4px] before:h-[4px] before:bg-[#51FE81] before:rounded-full">按要求填写报名表，请填写自己的真实信息，我们会认真审核每一份符合要求的报名表。</div>
            </li>
          </ul>
        </Popup>
        <ConfirmModal title="活动公告" v-model="anouncementModalVisible" just-notify v-if="data?.activity.announcement">
          <div class="text-[#666] text-[12px] leading-[17px] whitespace-pre-line">{{ data?.activity.announcement }}</div>
        </ConfirmModal>
        <nut-image-preview :show="coverPreviewerVisible" :images="[{ src: data?.activity.coverUrl ?? '' }]" @close="coverPreviewerVisible = false" />
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import moment from 'moment';
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { useReady, useLoad } from '@tarojs/taro';
import { ActivityFeature, activityTypeMap, VolunteerType } from '@/constants/value-enum';
import { useContentHeight, useGetSignUpDetail } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import Popup from '@/components/popup.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { ISignUpDetail } from '@/composables/use-api-types';

let id: number;

const isLoading = ref(true);
const data = ref<ISignUpDetail>();
const noticePopupVisible = ref(false);
const coverPreviewerVisible = ref(false);
const anouncementModalVisible = ref(false);

const contentHeight = useContentHeight();

const handleOpenLocation = () => Taro.openLocation({
  name: `${data.value!.activity.address} | ${data.value!.activity.addressDetailVo.detail}`,
  latitude: parseFloat(data.value!.activity.addressDetailVo.latitude),
  longitude: parseFloat(data.value!.activity.addressDetailVo.longitude),
});

const getPageData = async () => {
  const detail = await useGetSignUpDetail({ id });
  data.value = detail;
  setTimeout(() => isLoading.value = false, 600);
};

useLoad<{ id: number }>(({ id: _id }: { id: number }) => id = _id);
useReady(getPageData);

</script>

<style lang="scss">
  @use 'sign-up-detail' as *;
</style>