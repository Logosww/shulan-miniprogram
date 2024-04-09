import indexIcon from '@/assets/icon/tabbar/home.svg';
import indexActiveIcon from '@/assets/icon/tabbar/home_active.svg';
import liveIcon from '@/assets/icon/tabbar/live.svg';
import liveActiveIcon from '@/assets/icon/tabbar/live_active.svg';
import welfareIcon from '@/assets/icon/tabbar/welfare.svg';
import welfareActiveIcon from '@/assets/icon/tabbar/welfare_active.svg';
import myIcon from '@/assets/icon/tabbar/my.svg';
import myActiveIcon from '@/assets/icon/tabbar/my_active.svg';
import Home from '@/pages/index/tab-pages/home/home.vue';
import Live from '@/pages/index/tab-pages/live/live.vue';
import Welfare from '@/pages/index/tab-pages/welfare/welfare.vue';
import My from '@/pages/index/tab-pages/my/my.vue';

import type { Component } from 'vue';

interface ITabbarItemConfig {
  name: string;
  title: string;
  route: string;
  icon: string;
  activeIcon: string;
  pageComponent: Component
};

export const tabbarList: ITabbarItemConfig[] = [
  {
    name: 'home',
    title: '首页',
    route: '/',
    icon: indexIcon,
    activeIcon: indexActiveIcon,
    pageComponent: Home,
  },
  {
    name: 'live',
    title: '现场回顾',
    route: '/live',
    icon: liveIcon,
    activeIcon: liveActiveIcon,
    pageComponent: Live,
  },
  {
    name: 'welfare',
    title: '福利中心',
    route: '/welfare',
    icon: welfareIcon,
    activeIcon: welfareActiveIcon,
    pageComponent: Welfare,
  },
  {
    name: 'my',
    title: '我的',
    route: '/my',
    icon: myIcon,
    activeIcon: myActiveIcon,
    pageComponent: My,
  },
];