import { get, post, put, del } from '@/utils/http';

import type { 
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

export const useGetActivitiesByType = (params: IPagingParams & NullableFilter<{
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

export const useCheckin = (params: { id: number }) => put('/superAdmin/volunteer/checkin', params);