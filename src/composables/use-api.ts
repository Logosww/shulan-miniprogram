import { get, post, put, del } from '@/utils/http';

import { 
  ISignUpPageData,
  IActivityDetail,
  IActivityPreview,
  ICOSBucketCredentials,
  ILoginResult, 
  IPagingParams,
  IUserProfile,
  IVerifyForm,
  IVolunteerWhitelistInfo,
  IWorkData,
  NullableFilter,
  IPagingResult,
  ISignUpDetail,
  ISignUpRecord,
  IVerifyData,
  IBanner,
  ILive,
  IVolunteerHistoryItem,
  IVolunteerCertificate,
  IPayrollRecordYearItem,
  INotification,
  INotificationDetail,
} from './use-api-types';
import type { ActivityType, VolunteerSignUpState } from '@/constants';

export const useMobileLogin = (params: { 
  phoneCode: string; 
  wxmpCode: string;
}) => post<ILoginResult>('/public/wxmp/account/quickLogin', params);

export const useSmsLogin = (params: {
  purePhoneNumber: string;
  smsCode: string;
  wxmpCode: string;
}) => post<ILoginResult>('/public/wxmp/account/smsLogin', { countryCode: '86', ...params });

export const useSendSmsCode = (params: { purePhoneNumber: string }) => post('/public/sms/send', { countryCode: '86', ...params });

export const useLogout = () => del('/wxmp/account/logout');

export const useGetPagingActivities = (params: IPagingParams & NullableFilter<{
  city: string;
  type: ActivityType,
  keyword: string;
}>) => post<IPagingResult<IActivityPreview>>('/public/wxmp/index/activity/search', params);

export const useSearchPagingActivities = (params: IPagingParams & NullableFilter<{
  city: string;
  type: ActivityType;
  activityAt: [string, string];
}>) => post<IPagingResult<IActivityPreview>>('/public/wxmp/index/activity/type/search', params);

export const useGetActivityDetail = (params: { id: number }) => get<IActivityDetail>('/public/wxmp/index/activity/detail', params);

export const useGetRecommendedActivities = (params: { id: number }) => get<IActivityPreview[]>('/public/wxmp/index/activity/recommend', params);

export const useGetWorks = (params: { id: number }) => get<IWorkData>('/public/wxmp/index/activity/signupPopPage', params);

export const useGetUserProfile = () => get<Omit<IUserProfile, 'desensitizedPhone'>>('/wxmp/my/index');

export const useGetUserPartialProfile = () => get<Omit<IUserProfile, 'volunteerState' | 'activityCompleteCount'>>('/wxmp/my/user/info');

export const useModifyUserPartialProfile = (params: { nickname: string; avatarPath: string }) => put('/wxmp/my/user/update', params);

export const useVerifyVolunteer = (params: IVerifyForm) => put('/wxmp/my/volunteer/cert', params);

export const useCancelVerify = () => del('/wxmp/my/volunteer/cancel');

export const useGetVerifyData = () => get<IVerifyData>('/wxmp/my/volunteer/get');

export const useGetWhitelistInfo = () => get<IVolunteerWhitelistInfo>('/volunteer/my/state');

export const useGetCOSBucketCredentials = () => get<ICOSBucketCredentials>('/public/cos/secret');

export const useGetSignUpPageData = (params: { activityWorkIds: number[]; activityId: number }) => 
  post<ISignUpPageData>('/volunteer/wxmp/index/activity/signupDetailPage', params);

export const useSignUp = (params: { activityWorkIds: number[]; reason: string; activityId: number }) => post('/volunteer/wxmp/index/activity/signup', params);

export const useGetSignUpDetail = (params: { id: number }) => get<ISignUpDetail>('/volunteer/wxmp/my/signupRecord/detail', params);

export const useDecodeGeography = (params: { longitude: number; latitude: number }) => 
  post<string>('/public/wxmp/geographyDecode', {
    longitude: params.longitude.toFixed(6),
    latitude: params.latitude.toFixed(6),
  });

export const useGetSignUpRecords = (params: IPagingParams & { activityWorkVolunteerState: VolunteerSignUpState | null }) =>
  post<IPagingResult<ISignUpRecord>>('/volunteer/wxmp/my/signupRecord/search', params);

export const useCancelSignUp = (params: { id: number }) => put('/volunteer/wxmp/my/signupRecord/cancelSignup', params);

export const useShareActivity = (params: { id: number }) => get('/public/wxmp/index/activity/share', params);

export const useCheckin = (params: { id: number }) => put('/wxmp/my/signupRecord/checkin', params);

export const useGetBannerList = () => get<IBanner[]>('/public/wxmp/index/banner/list');

export const useGetPagingLives = (params: IPagingParams & NullableFilter<{
  city: string;
  keyword: string;
  activityType: ActivityType;
  activityAt: [string, string];
}>) => post<IPagingResult<ILive>>('/public/wxmp/history/activity/search', params);

export const useGetLiveArticleUrl = (params: { id: number }) => get<string>('/public/wxmp/history/activity/detail', params);

export const useSearchActivities = (params: { keyword: string }) => post<IActivityPreview[]>('/public/wxmp/index/activity/searchList', params);

export const useGetVolunteerHistory = () => get<IVolunteerHistoryItem[]>('/volunteer/my/volunteerRecord/list');

export const useGetCertificate = (params: { id: number }) => get<IVolunteerCertificate>('/volunteer/my/volunteerRecord/detail', params);

export const useGetPayrollRecords = () => get<IPayrollRecordYearItem[]>('/payroll/record/list');

export const useGetPagingNotifications = (params: IPagingParams) => post<IPagingResult<INotification>>('/wxmp/notice/pageSearch', params);

export const useGetNotificationDetail = (params: { id: number }) => get<INotificationDetail>('/wxmp/notice/detail', params);

export const useReadNotification = (params: { id: number }) => put('/wxmp/notice/read', params);

export const useGetNotificationCount = () => get<number>('/wxmp/notice/redDot');