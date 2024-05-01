<template>
  <scroll-view
    v-bind="$attrs"
    type="list"
    refresher-default-style="none"
    refresher-background="transparent"
    :style="{ height: `${height}px` }"
    :enhanced="true"
    :enable-passive="true"
    :scroll-y="true"
    :show-scrollbar="false"
    :fast-deceleration="true"
    :scroll-with-animation="true"
    :using-sticky="true"
    :refresher-enabled="refresher"
    :refresher-triggered="isRefreshing"
    :refresher-threshold="refresherThreshold"
    @refresherpulling="handleRefresherPulling"
    @refresherrefresh="handleRefresh"
  >
    <slot-view class="w-full" :name="'refresher'" v-if="refresher">
      <div class="w-full flex justify-center py-[16px]" :style="{ opacity: refresherPullingPer }">
        <canvas class="w-[50px] h-[50px]" :id="canvasId" type="2d" v-show="isAnimationDownloaded"></canvas>
        <div class="text-[#999] text-[12px] pt-[16px]" v-show="!isAnimationDownloaded">正在刷新...</div>
      </div>
    </slot-view>
    <slot></slot>
  </scroll-view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Taro, { useReady } from '@tarojs/taro';
import { nanoid, throttleByRaf } from '@/utils';
import lottie from 'lottie-miniprogram';
import { useCOS } from '@/composables';

const props = defineProps<{ height: number; refresher?: boolean; refreshHandler?: () => Promise<any>; }>();

let animation: ReturnType<typeof lottie.loadAnimation>;

const refresherThreshold = 96;
const canvasId =`loading-animation-${nanoid()}`;
const isAnimationDownloaded = ref(true);
const isRefreshing = ref(false);
const refresherPullingPer = ref(0);

const { downloadAndRead } = useCOS();

const handleRefresherPulling = throttleByRaf(({ detail: { dy } }: { detail: { dy: number } }) => {
  if(refresherPullingPer.value === 1) return;

  let pct = dy / refresherThreshold;
  if(pct > 1) pct = 1;
  refresherPullingPer.value = pct;
});

const handleRefresh = () => {
  isRefreshing.value = true;
  props.refreshHandler?.().then(() => Taro.nextTick(
    () => setTimeout(() => {
      isRefreshing.value = false;
      refresherPullingPer.value = 0;
      animation.goToAndStop(0);
    }, 800)
  ));
  animation.play();
};

const initAnimation = () => {
  if(animation) return;

  Taro.createSelectorQuery()
    .select(`#${canvasId}`)
    .node(async ({ node: canvas }) => {
      const animationData = 
        await downloadAndRead<Record<string, any>>({ key: 'frame_data.json', jsonParse: true })
        .then(({ data }) => data)
        .catch(() => isAnimationDownloaded.value = false);
      if(!(isAnimationDownloaded.value && canvas)) return;
      
      const dpr = Taro.getSystemInfoSync().pixelRatio;
      canvas.width = 50 * dpr;
      canvas.height = 50 * dpr;
      const context = canvas.getContext('2d');

      lottie.setup(canvas);
      animation = lottie.loadAnimation({
        animationData,
        loop: true,
        autoplay: false,
        rendererSettings: {
          context,
        }
      });
    })
    .exec();
};

useReady(initAnimation);
onMounted(initAnimation);
</script>