export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/login',
    'pages/login-sms/login-sms',
    'pages/activity-detail/activity-detail',
    'pages/live-detail/live-detail',
  ],
  subpackages: [
    {
      root: 'packageA',
      name: 'sign-up',
      pages: [
        'pages/sign-up/sign-up',
        'pages/sign-up-detail/sign-up-detail',
        'pages/sign-up-record/sign-up-record',
      ],
    },
    {
      root: 'packageB',
      name: 'treasure-box',
      pages: [
        'pages/select-city/select-city',
        'pages/search/search',
        'pages/notification/notification',
        'pages/activity-list/activity-list',
        'pages/profile/profile',
        'pages/verify/verify',
        'pages/input/input',
        'pages/history/history',
        'pages/certificate/certificate',
        'pages/notification-detail/notification-detail',
      ],
    },
    {
      root: 'packageC',
      name: 'others',
      pages: [
        'pages/statement/statement',
        'pages/payroll/payroll',
      ]
    }
  ],
  preloadRule: {
    'pages/index/index': {
      network: 'all',
      packages: ['sign-up', 'treasure-box']
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationStyle: 'custom',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  componentFramework: 'glass-easel',
  permission: {
    'scope.userFuzzyLocation': {
      desc: '你的位置信息将用于附近演出相关信息的推荐'
    }
  },
  lazyCodeLoading: 'requiredComponents',
  rendererOptions: {
    skyline: {
      disableABTest: true,
      defaultDisplayBlock: true,
      sdkVersionBegin: "3.0.0",
      sdkVersionEnd: "15.255.255",
    }
  },
  requiredPrivateInfos: ['getFuzzyLocation'],
})
