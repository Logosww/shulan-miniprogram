import type { 
  ActivityFeature,
  ActivityState, 
  ActivityType, 
  WorkTag, 
  Gender, 
  Role, 
  VolunteerIdentity, 
  VolunteerSignUpState, 
  VolunteerType, 
  VolunteerWhitelistState,
  IdCardType,
  BannerTargetType,
} from '@/constants/value-enum';

export interface ILoginResult {
  token: string;
  role: Role;
};

export interface IPagingParams {
  page: number;
  size: number;
};

export interface IPagingResult<T> {
  page: number;
  size: number;
  pages: number;
  total: number;
  hasPrevious: boolean;
  hasNext: boolean;
  records: T[];
};

export type NullableFilter<T> = {
  [K in keyof T]: T[K] | null;
};

export interface IActivityPreview {
  id: number;
  name: string;
  coverUrl: string;
  city: string;
  address: string;
  state: ActivityState;
  type: ActivityType;
  startAt: string;
  endAt: string;
  label: WorkTag;
  avatarNameList: {
    avatarUrl: string;
    name: string;
  }[];
};

export interface IActivityDetail extends Omit<IActivityPreview, 'avatarNameList'> {
  announcement: string;
  description: string;
  signupStartAt: string;
  signupEndAt: string;
  features: ActivityFeature[];
  workList: {
    name: string;
    description: string;
    startAt: string;
    endAt: string;
  }[];
  addressDetailVo: {
    detail: string;
    longitude: string;
    latitude: string;
  }
};

export interface IWork {
  id: number;
  name: string;
  startAt: string;
  endAt: string;
  money: number;
  integral: number;
  isFull: boolean;
};

export interface IWorkData {
  workList: IWork[];
  signupEndAt: string;
};

export interface IUserProfile {
  nickname: string;
  avatarUrl: string;
  desensitizedPhone?: string;
  activityCompleteCount?: number;
  volunteerState?: VolunteerWhitelistState;
};

export interface IVerifyForm {
  sex: Gender;
  age: number;
  idCard: string;
  name: string;
  school: string;
  major: string;
  grade: string;
  jobUnit: string;
  idPhotoPath: string;
  experience: string;
  idCardType: IdCardType;
  joinUnitPaths: string[];
  experiencePaths: string[];
  studentCardPaths: string[];
  idCardPortraitPath: string;
  idCardNationalPath: string;
  identity: VolunteerIdentity;
};

export interface IVerifyData extends Omit<IVerifyForm,
  | 'idPhotoPath'
  | 'joinUnitPaths'
  | 'experiencePaths'
  | 'studentCardPaths'
  | 'idCardPortraitPath'
  | 'idCardNationalPath'
> {
  idPhotoUrl: string;
  joinUnitUrls: string[];
  experienceUrls: string[];
  studentCardUrls: string[];
  idCardPortraitUrl: string;
  idCardNationalUrl: string;
};

export interface IVolunteerWhitelistInfo {
  normal: {
    currentViolateCount: number;
    sysCurrentViolateCount: number;
    banMonth: number;
  };
  whiteList: {
    expireAt: string;
  };
  violateList: {
    releaseAt: string;
    violateAt: string;
    violateCount: number;
  };
};

export interface ICOSBucketCredentials {
  credentials: {
    tmpSecretId: string;
    tmpSecretKey: string;
    sessionToken: string;
  };
  startTime: number;
  expiredTime: number;
};

export interface ISignUpPageData {
  activity: Pick<IActivityPreview, 'id' | 'name' | 'city' | 'type' | 'coverUrl'>;
  workList: Omit<IWork, 'integral' | 'isFull' | 'money'>[];
  volunteer: Pick<IVerifyForm, 
    | 'name'
    | 'experience'
    | 'identity'
    | 'school'
    | 'major'
    | 'grade'
    | 'jobUnit'
  > & {
    id: number;
    sex: Gender;
    age: number;
    desensitizedPhone: string;
    desensitizedIdCard: string;
    joinUnitUrls: string[];
    experienceUrls: string[];
    studentCardUrls: string[];
  };
  cancelAt: {
    time: string;
    deadline: number;
  }
};

export interface ISignUpDetail {
  id: number;
  activityWorkVolunteerIdentity: VolunteerType;
  activity: Pick<IActivityDetail,
    | 'id'
    | 'name'
    | 'city'
    | 'coverUrl'
    | 'address'
    | 'description'
    | 'announcement'
    | 'type'
    | 'addressDetailVo'
    | 'features'
  >;
  work: Omit<IWork, 'isFull'> & { description: string };
  checkin: {
    isChecked: boolean;
    qrCodeUrl?: string;
  };
};

export interface ISignUpRecord {
  id: number;
  activityCancelCount: number;
  activityWorkVolunteerState: VolunteerSignUpState;
  activityWorkVolunteerIdentity: VolunteerType;
  activity: Omit<IActivityPreview,
    | 'state'
    | 'label'
    | 'startDate'
    | 'endDate'
    | 'avatarNameList'
  > & { signupCancelAt: string };
  work: {
    id: number;
    name: string;
    startAt: string;
    endAt: string;
    money: number;
    label: WorkTag;
  };
};

export interface IBanner {
  id: number;
  type: BannerTargetType;
  targetId: number;
  coverUrl: string;
};