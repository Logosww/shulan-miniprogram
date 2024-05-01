export enum Role {
  user = 0,
  volunteer = 1,
  admin = 2,
  superAdmin = 3,
};

export enum Gender {
  male = 0,
  female = 1,
  unknown = 2,
};

export enum VolunteerWhitelistState {
  normal = 0,
  ignore = 1,
  whitelist = 2,
  forbidden = 3,
};;

export enum ActivityType {
  concert = 0,
  drama = 1,
  talkshow = 2,
  musicFesitival = 3,
  sports = 4,
};

export enum ActivityState {
  awaitingSubmit = 0,
  awaitingAudit = 1,
  auditFailed = 2,
  auditPassed = 3,
  activated = 4,
  finished = 5,
};

export enum ActivityFeature {
  insurance = 0,
  meal = 1,
  water = 2,
  clothes = 3,
  money = 4,
  band = 5,
};

export enum WorkTag {
  normal = 0,
  appended = 1,
};

export enum VolunteerIdentity {
  student = 0,
  socialFigure = 1,
};

export enum VolunteerType {
  normal = 0,
  temporary = 1,
  personInCharge = 2,
};

export enum VolunteerSignUpState {
  awaitingAudit = 0,
  auditPassed = 1,
  auditFailed = 2,
  cancelled = 3,
  cancelledOutOfIllegal = 4,
  atWork = 5,
  finished = 6,
  offWork = 7,
};

export enum IdCardType {
  mainlandIdCard = 0,
  HTMPass = 1,
  passport = 2,
};

export enum BannerType {
  activity = 0,
  live = 1,
  none = 2,
  miniprogram = 3,
};

export const activityTypeMap: Record<ActivityType, string> = {
  [ActivityType.concert]: '演唱会',
  [ActivityType.drama]: '话剧',
  [ActivityType.talkshow]: '脱口秀',
  [ActivityType.musicFesitival]: '音乐节',
  [ActivityType.sports]: '体育',
};

export const workTagMap: Record<WorkTag, { class: string; text: string } | undefined> = {
  [WorkTag.normal]: void 0,
  [WorkTag.appended]: { class: 'text-[#FFAA00] bg-[#FFF9D9]', text: '补录' },
};

export const volunteerWhitelistStateMap: Record<VolunteerWhitelistState, string> = {
  [VolunteerWhitelistState.normal]: '正常状态',
  [VolunteerWhitelistState.ignore]: '黑名单状态',
  [VolunteerWhitelistState.whitelist]: '白名单状态',
  [VolunteerWhitelistState.forbidden]: '封禁状态',
};

export const genderMap: Record<Gender, string> = {
  [Gender.male]: '男',
  [Gender.female]: '女',
  [Gender.unknown]: '未知',
};

export const volunteerSignUpStateMap: Record<VolunteerSignUpState, string> = {
  [VolunteerSignUpState.awaitingAudit]: '审核中',
  [VolunteerSignUpState.auditPassed]: '报名成功',
  [VolunteerSignUpState.auditFailed]: '报名失败',
  [VolunteerSignUpState.cancelled]: '主动取消',
  [VolunteerSignUpState.cancelledOutOfIllegal]: '违规取消',
  [VolunteerSignUpState.atWork]: '进行中',
  [VolunteerSignUpState.offWork]: '未到岗',
  [VolunteerSignUpState.finished]: '已完成',
};

export const volunteerTypeMap: Record<VolunteerType, string> = {
  [VolunteerType.normal]: '正常',
  [VolunteerType.temporary]: '临时',
  [VolunteerType.personInCharge]: '负责人',
};

export const idCardTypeMap: Record<IdCardType, string> = {
  [IdCardType.mainlandIdCard]: '中国大陆居民身份证',
  [IdCardType.HTMPass]: '港澳台通行证',
  [IdCardType.passport]: '护照',
};

export const bannerTypePathnameMap: Record<BannerType, string | undefined> = {
  [BannerType.activity]: 'activity-detail',
  [BannerType.live]: 'live-detail',
  [BannerType.none]: void 0,
  [BannerType.miniprogram]: void 0,
};