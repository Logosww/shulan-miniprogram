<template>
  <ConfigProvider>
    <Container navbar-title="消息" disable-safe-bottom>
      <nut-tabs v-model="activeTab">
        <nut-tab-pane title="通知" pane-key="system">
          <scroll-view
            class="bg-[#F4F4F4]"
            :style="scrollViewStyle"
            :enhanced="true"
            :enable-passive="true"
            :scroll-y="true"
            :show-scrollbar="false"
            :fast-deceleration="true"
          >
            <div class="bg-white px-[16px] mt-[10px]">
              <div class="notification-item">
                <image class="notification-item__avatar" src="@/assets/image/notification/system_avatar.png" />
                <div class="notification-item__content">
                  <div class="notification-item__content-top">
                    <div class="notification-item__title">系统通知</div>
                    <div class="notification-item__time">18:45</div>
                  </div>
                  <div class="notification-item__content-bottom">尊敬的用户，如您在工作过程中遇到如您在工作过程中遇到</div>
                </div>
              </div>
              <div class="notification-item">
                <image class="notification-item__avatar" src="@/assets/image/notification/system_avatar.png" />
                <div class="notification-item__content">
                  <div class="notification-item__content-top">
                    <div class="notification-item__title">系统通知</div>
                    <div class="notification-item__time">2023-12-24</div>
                  </div>
                  <div class="notification-item__content-bottom">尊敬的用户，如您在工作过程中遇到如您在工作过程中遇到</div>
                </div>
              </div>
            </div>
          </scroll-view>
        </nut-tab-pane>
        <nut-tab-pane title="演出消息" pane-key="show">
          <scroll-view
            class="bg-[#F5F5F5]"
            :style="scrollViewStyle"
            :enhanced="true"
            :enable-passive="true"
            :scroll-y="true"
            :show-scrollbar="false"
            :fast-deceleration="true"
          >
            <div class="bg-white px-[16px] mt-[10px]">
              <div class="notification-item">
                <image class="notification-item__avatar" src="@/assets/image/notification/system_avatar.png" />
                <div class="notification-item__content">
                  <div class="notification-item__content-top">
                    <div class="notification-item__title">系统通知</div>
                    <div class="notification-item__time">18:45</div>
                  </div>
                  <div class="notification-item__content-bottom">尊敬的用户，如您在工作过程中遇到如您在工作过程中遇到</div>
                </div>
              </div>
              <div class="notification-item">
                <image class="notification-item__avatar" src="@/assets/image/notification/system_avatar.png" />
                <div class="notification-item__content">
                  <div class="notification-item__content-top">
                    <div class="notification-item__title">系统通知</div>
                    <div class="notification-item__time">2023-12-24</div>
                  </div>
                  <div class="notification-item__content-bottom">尊敬的用户，如您在工作过程中遇到如您在工作过程中遇到</div>
                </div>
              </div>
            </div>
          </scroll-view>
        </nut-tab-pane>
      </nut-tabs>
      <div class="absolute box-border right-[16px] top-[9px] h-[24px] px-[12px] py-[2px] text-[#41CC68] text-[14px] font-[500] border-[1px] border-solid border-[#41CC68] rounded-[15px]">一键已读</div>
    </Container>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ref,computed } from 'vue';
import { useContentHeight } from '@/composables';
import ConfigProvider from '@/components/config-provider.vue';
import Container from '@/components/container.vue';

const activeTab = ref('system');

const contentHeight = useContentHeight();

const scrollViewStyle = computed(() => `height: ${contentHeight.value - 90}px`);
</script>

<style lang="scss">
  @use 'notification' as *;
</style>