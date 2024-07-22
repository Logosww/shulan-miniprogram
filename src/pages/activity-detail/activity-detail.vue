<template>
  <ConfigProvider>
    <Container navbar-title="演出详情" :bg-style="{ transition: 'background-color .24s ease', transitionDelay: '.2s', backgroundColor: isLoading ? '#fff' : '#50FE82' }" disable-safe-bottom>
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
          id="scrollview"
          class="bg-[#F7F7F7] animation-fade-in"
          :height="contentHeight"
          :scroll-into-view="currentId"
          :refresh-handler="getPageData"
          @scroll="anchorRef?.scrollHandler"
          refresher
          v-else
        >
          <div>
            <div class="px-[16px] py-[20px] bg-white mb-[16px]">
              <div class="flex">
                <image class="w-[94px] h-[128px] rounded-[12px] mr-[12px] flex-shrink-0" mode="aspectFill" :src="data?.coverUrl" :fade-in="true" @tap="coverPreviewerVisible = true" />
                <div class="flex flex-col justify-between">
                  <div class="text-[#0D0F02] text-[14px] font-bold leading-[16px]">
                    {{ data?.city }} |【{{ data && activityTypeMap[data.type] }}】{{ data?.name }}
                  </div>
                  <div class="space-y-[3px] text-[#808080] text-[12px] leading-[14px]">
                    <div class="flex justify-between">
                      活动时间：
                      <div class="text-[#666] font-bold">{{ moment(data?.startAt).format('YYYY.MM.DD') }} — {{ moment(data?.endAt).format('YYYY.MM.DD') }}</div>
                    </div>
                    <div class="flex justify-between">
                      报名开始时间：
                      <div class="text-[#666] font-bold">{{ moment(data?.signupStartAt).format('YYYY.MM.DD HH:mm') }}</div>
                    </div>
                    <div class="flex justify-between">
                      报名结束时间：
                      <div class="text-[#666] font-bold">{{ moment(data?.signupEndAt).format('YYYY.MM.DD HH:mm') }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-[12px] h-[1px] bg-[#E6E6E6]"></div>
              <div class="flex justify-between items-center">
                <div>
                  <div class="flex items-center mb-[4px]">
                    <image class="w-[14px] h-[14px] mr-[8px]" src="@/assets/icon/home/position.svg" mode="aspectFit" :svg="true" />
                    <div class="text-[14px] leading-[16px] text-[#0D0F02] font-[500]">{{ data?.city }} | {{ data?.address }}</div>
                  </div>
                  <div class="text-[12px] text-[#808080] leading-[14px]">{{ data?.addressDetailVo.detail }}</div>
                </div>
                <image class="w-[28px] h-[28px]" src="@/assets/icon/activity-detail/navigation.svg" mode="aspectFit" :svg="true" @tap="handleOpenLocation" />
              </div>
              <div class="my-[12px] h-[1px] bg-[#E6E6E6]"></div>
              <div class="flex justify-between items-center" @tap="anouncementModalVisible = true">
                <div class="flex items-center">
                  <image class="w-[36px] h-[20px] mr-[12px]" src="@/assets/icon/activity-detail/notice.svg" mode="aspectFit" :svg="true" />
                  <div class="text-[#0D0F02] text-[14px] leading-[16px] max-w-[252px] truncate">{{ data?.announcement || '暂无公告' }}</div>
                </div>
                <image class="w-[5px] h-[10px]" src="@/assets/icon/activity-detail/right.svg" mode="aspectFit" :svg="true" v-if="data?.announcement" />
              </div>
            </div>
            <div class="p-[16px] bg-white mb-[16px]" v-if="data?.features.length">
              <div class="flex items-end mb-[12px]">
                <image class="w-[75px] h-[15px] mr-[8px]" src="@/assets/icon/activity-detail/safeguard.svg" mode="aspectFit" :svg="true" />
                <div class="text-[#666] text-[12px] leading-[14px]">本活动可以提供的保障</div>
              </div>
              <div class="flex space-x-[18px] overflow-x-auto flex-nowrap features">
                <div class="flex flex-col items-center" v-if="data?.features.includes(ActivityFeature.insurance)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/insurance.svg" mode="aspectFit" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">免费保险</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.features.includes(ActivityFeature.meal)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/meal.svg" mode="aspectFit" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">工作餐</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.features.includes(ActivityFeature.clothes)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/clothes.svg" mode="aspectFit" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">工作马甲</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.features.includes(ActivityFeature.money)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/money.svg" mode="aspectFit" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">工资补贴</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.features.includes(ActivityFeature.band)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/band.svg" mode="aspectFit" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">工作手环</div>
                </div>
                <div class="flex flex-col items-center" v-if="data?.features.includes(ActivityFeature.water)">
                  <image class="w-[24px] h-[24px] mb-[4px]" src="@/assets/icon/activity-detail/water.svg" mode="aspectFit" :svg="true" />
                  <div class="text-[12px] text-[#0D0F02] font-[500] whitespace-nowrap">饮用水</div>
                </div>
              </div>
            </div>
            <div class="sticky top-0 px-[16px] z-10 backdrop">
              <Anchor class="py-[16px] border-[0] border-b-[1px] border-b-[#E9E9E9] border-solid" ref="anchorRef" container="#scrollview" :config="anchorConfig" @scroll-to="id => currentId = id" />
            </div>
            <div id="detail" class="bg-white px-[16px] pb-[16px] mb-[16px]">
              <div class="py-[12px] text-[#0D0F02] text-[16px] leading-[19px] font-bold">演出描述</div>
              <div class="text-[#0D0F02] text-[14px] leading-[16px] whitespace-pre-line">{{ data?.description }}</div>
              <div class="my-[12px] text-[#0D0F02] text-[16px] leading-[19px] font-bold">工作介绍</div>
              <div class="pl-[16px] text-[#666] text-[14px] leading-[16px]">
                <div class="text-[#0D0F02] space-y-[8px] mt-[12px]" v-for="(work, index) in data?.workList" :key="index">
                  <div class="font-bold">{{ work.name }}</div>
                  <div class="flex">
                    <div class="font-[500] mr-[4px] whitespace-nowrap">工作详情：</div>
                    {{ work.description }}
                  </div>
                  <div class="flex">
                    <div class="font-[500] mr-[4px] whitespace-nowrap">工作时间：</div>
                    <div class="text-[#404040]">
                      {{ moment(work.startAt).format('YYYY.MM.DD HH:mm') }} — {{ moment(work.endAt).format('YYYY.MM.DD HH:mm') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="notice" class="bg-white p-[16px] mb-[16px]" v-if="data?.isWorkInstruction">
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
            <div id="recommend" class="p-[16px]" v-if="activityList.length">
              <div class="text-[#262626] text-[16px] font-bold leading-[19px] mb-[10px]">为你推荐</div>
              <div class="space-y-[10px]">
                <ActivityCard
                  v-for="(item, index) in activityList"
                  :key="index"
                  :data="item"
                  @to-sign-up="handleToSignUp(item.id)"
                />
              </div>
            </div>
          </div>
          <div class="h-[80px]"></div>
          <root-portal>
            <div class="action-bar" :class="[isLoading ? 'is-hidden' : '']">
              <button class="text-[#41CC68] text-[16px] leading-[44px] font-[500] rounded-[37px] px-[38px] bg-transparent border-[#41CC68] border-[1px] border-solid" open-type="share" @tap="handleShare">分享</button>
              <div class="text-[#0D0F02] text-[16px] leading-[44px] font-bold rounded-[37px] bg-[#51FE81] px-[72px]" @tap="handleToSignUp(activityId)" v-if="data?.state === ActivityState.activated">立即报名</div>
              <div class="text-[#B3B3B3] text-[16px] leading-[44px] font-bold rounded-[37px] bg-[#F2F2F2] px-[64px]" v-else-if="data?.state === ActivityState.auditPassed">报名待开启</div>
              <div v-else-if="data?.state === ActivityState.finished">
                <div class="text-[#51FE81] text-[16px] leading-[44px] font-bold rounded-[37px] bg-[#0D0F02] px-[72px]" @tap="Taro.navigateTo({ url: `/pages/live-detail/live-detail?id=${activityId}` })" v-if="data?.hasLive">现场回顾</div>
                <div class="text-[#B3B3B3] text-[16px] leading-[44px] font-bold rounded-[37px] bg-[#F2F2F2] px-[64px]" v-else>活动已结束</div>
              </div>
            </div>
          </root-portal>
        </my-scroll-view>
        <Popup title="工作须知" :content-height="500" v-model="noticePopupVisible" v-if="data?.isWorkInstruction">
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
        <SignUpPopup v-model="signUpPopupVisible" :data="workData" @sign-up="handleSignUp" />
        <ConfirmModal title="活动公告" v-model="anouncementModalVisible" just-notify v-if="data?.announcement">
          <div class="text-[#666] text-[12px] leading-[17px] whitespace-pre-line">{{ data?.announcement }}</div>
        </ConfirmModal>
        <nut-image-preview :show="coverPreviewerVisible" :images="[{ src: data?.coverUrl ?? '' }]" :fade-in="true" @close="coverPreviewerVisible = false" />
      </div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import moment from 'moment';
import { ref, computed } from 'vue';
import Taro, { useReady, useLoad } from '@tarojs/taro';
import { ActivityState, ActivityFeature, activityTypeMap } from '@/constants/value-enum';
import { useContentHeight, useGetActivityDetail, useGetRecommendedActivities, useGetWorks, useShareActivity } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';
import Anchor from '@/components/anchor.vue';
import Popup from '@/components/popup.vue';
import ActivityCard from '@/components/activity-card.vue';
import SignUpPopup from '@/components/sign-up-popup.vue';
import ConfirmModal from '@/components/confirm-modal.vue';
import MyScrollView from '@/components/my-scroll-view.vue';

import type { IAnchorItemConfig } from '@/components/anchor.vue';
import type { IWorkData, IActivityDetail, IActivityPreview } from '@/composables/use-api-types';

let activityId: number;

const currentId = ref('');
const isLoading = ref(true);
const noticePopupVisible = ref(false);
const signUpPopupVisible = ref(false);
const anouncementModalVisible = ref(false);
const coverPreviewerVisible = ref(false);
const data = ref<IActivityDetail>();
const anchorRef = ref<InstanceType<typeof Anchor>>();
const workData = ref<IWorkData>();
const activityList = ref<IActivityPreview[]>([]);

const contentHeight = useContentHeight();

const anchorConfig = computed<IAnchorItemConfig[]>(() => ([
  {
    id: 'detail',
    title: '详情',
  },
  {
    id: 'notice',
    title: '须知',
    hide: !data.value?.isWorkInstruction,
  },
  {
    id: 'recommend',
    title: '推荐',
    hide: !activityList?.value.length,
  },
]));

const handleOpenLocation = () => Taro.openLocation({
  name: `${data.value!.address} | ${data.value!.addressDetailVo.detail}`,
  latitude: parseFloat(data.value!.addressDetailVo.latitude),
  longitude: parseFloat(data.value!.addressDetailVo.longitude),
});

const handleToSignUp = async (id: number) => {
  Taro.showLoading({ title: '加载中' });
  workData.value = await useGetWorks({ id });
  Taro.hideLoading();
  signUpPopupVisible.value = true;
};

const handleSignUp = (workIds: number[]) => Taro.navigateTo({
  url: `/packageA/pages/sign-up/sign-up?activityId=${activityId}&activityWorkIds=${workIds.join(',')}`,
  success: () => signUpPopupVisible.value = false,
});

const handleShare = () => {
  Taro.updateShareMenu({ 
    withShareTicket: true,
    // @ts-ignore
    isPrivateMessage: true,
  }).then(() => Taro.showShareMenu({ withShareTicket: true }))
    .then(() => useShareActivity({ id: activityId }));
};

const getPageData = async () => {
  const detail = await useGetActivityDetail({ id: activityId });
  data.value = detail;
  setTimeout(() => {
    isLoading.value && setTimeout(() => (detail.state === ActivityState.activated) && (anouncementModalVisible.value = true), 350);
    isLoading.value = false;
  }, 600);
};

useLoad(async ({ id }: { id: number }) => {
  activityId = id;
  activityList.value = await useGetRecommendedActivities({ id });
});
useReady(getPageData);

</script>

<style lang="scss">
  @use 'activity-detail' as *;
</style>