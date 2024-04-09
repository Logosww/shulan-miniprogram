export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/login',
    'pages/login-sms/login-sms',
    'pages/select-city/select-city',
    'pages/search/search',
    'pages/notification/notification',
    'pages/activity-detail/activity-detail',
    'pages/sign-up/sign-up',
    'pages/live-detail/live-detail',
    'pages/activity-list/activity-list',
    'pages/identification/identification',
    'pages/profile/profile',
    'pages/verify/verify',
    'pages/sign-up-detail/sign-up-detail',
    'pages/sign-up-record/sign-up-record',
    'pages/statement/statement',
    'pages/input/input',
  ],
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
  requiredPrivateInfos: ['getFuzzyLocation'],
})
