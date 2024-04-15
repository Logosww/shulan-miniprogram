import { ActivityType } from './value-enum';

import type { IFilterItemConfig } from '@/components/filter-menu.vue';

export const liveFilterConfig: IFilterItemConfig[] = [
  {
    title: '全部',
    filterType: 'all',
  },
  {
    title: '位置',
    filterType: 'option',
    filterKey: 'city',
    filterOptions: [
      {
        title: '杭州',
        value: '杭州',
      },
      {
        title: '北京',
        value: '北京',
      },
      {
        title: '上海',
        value: '上海',
      },
      {
        title: '天津',
        value: '天津',
      },
      {
        title: '厦门',
        value: '厦门',
      },
      {
        title: '深圳',
        value: '深圳',
      },
      {
        title: '广州',
        value: '广州',
      },
      {
        title: '澳门',
        value: '澳门',
      },
      {
        title: '香港',
        value: '香港',
      },
      {
        title: '台湾',
        value: '台湾',
      },
      {
        title: '福州',
        value: '福州',
      },
      {
        title: '温州',
        value: '温州',
      },
      {
        title: '重庆',
        value: '重庆',
      },
      {
        title: '成都',
        value: '成都',
      },
      {
        title: '西安',
        value: '西安',
      },
      {
        title: '大理',
        value: '大理',
      },
      {
        title: '大连',
        value: '大连',
      },
      {
        title: '苏州',
        value: '苏州',
      },
      {
        title: '南京',
        value: '南京',
      },
      {
        title: '济南',
        value: '济南',
      },
      {
        title: '青岛',
        value: '青岛',
      },
      {
        title: '郑州',
        value: '郑州',
      },
      {
        title: '乌鲁木齐',
        value: '乌鲁木齐',
      },
    ],
  },
  {
    title: '演出时间',
    filterType: 'daterange',
    filterKey: 'daterange',
  },
  {
    title: '演出类型',
    filterType: 'option',
    filterKey: 'type',
    filterOptions: [
      {
        title: '话剧',
        value: ActivityType.drama,
      },
      {
        title: '演唱会',
        value: ActivityType.concert,
      },
      {
        title: '脱口秀',
        value: ActivityType.talkshow,
      },
      {
        title: '音乐节',
        value: ActivityType.musicFesitival,
      },
      {
        title: '体育',
        value: ActivityType.sports,
      },
    ],
  },
];

export const activityFilterConfig: IFilterItemConfig[] = [
  {
    title: '类别',
    filterType: 'option',
    filterKey: 'type',
    disableToggle: true,
    filterOptions: [
      {
        title: '话剧',
        value: ActivityType.drama,
      },
      {
        title: '演唱会',
        value: ActivityType.concert,
      },
      {
        title: '脱口秀',
        value: ActivityType.talkshow,
      },
      {
        title: '音乐节',
        value: ActivityType.musicFesitival,
      },
      {
        title: '体育',
        value: ActivityType.sports,
      },
    ],
  },
  {
    title: '位置',
    filterType: 'option',
    filterKey: 'city',
    filterOptions: [
      {
        title: '杭州',
        value: '杭州',
      },
      {
        title: '北京',
        value: '北京',
      },
      {
        title: '上海',
        value: '上海',
      },
      {
        title: '天津',
        value: '天津',
      },
      {
        title: '厦门',
        value: '厦门',
      },
      {
        title: '深圳',
        value: '深圳',
      },
      {
        title: '广州',
        value: '广州',
      },
      {
        title: '澳门',
        value: '澳门',
      },
      {
        title: '香港',
        value: '香港',
      },
      {
        title: '台湾',
        value: '台湾',
      },
      {
        title: '福州',
        value: '福州',
      },
      {
        title: '温州',
        value: '温州',
      },
      {
        title: '重庆',
        value: '重庆',
      },
      {
        title: '成都',
        value: '成都',
      },
      {
        title: '西安',
        value: '西安',
      },
      {
        title: '大理',
        value: '大理',
      },
      {
        title: '大连',
        value: '大连',
      },
      {
        title: '苏州',
        value: '苏州',
      },
      {
        title: '南京',
        value: '南京',
      },
      {
        title: '济南',
        value: '济南',
      },
      {
        title: '青岛',
        value: '青岛',
      },
      {
        title: '郑州',
        value: '郑州',
      },
      {
        title: '乌鲁木齐',
        value: '乌鲁木齐',
      },
    ],
  },
  {
    title: '演出时间',
    filterType: 'daterange',
    filterKey: 'activityAt',
  },
];