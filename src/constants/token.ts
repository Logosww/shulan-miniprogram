import type { InjectionKey } from 'vue';
import type { IUserProfile } from '@/composables/use-api-types';
import type { EventBusKey } from '@vueuse/core'
import type { VolunteerSignUpState } from './value-enum';

export const profileKey: InjectionKey<Omit<IUserProfile, 'desensitizedPhone'> | undefined> = Symbol('profileKey');// fooKey.ts

export const setSignUpRecordStateEventBusKey: EventBusKey<{
  id: number;
  state: VolunteerSignUpState;
  currentListKey?: VolunteerSignUpState;
}> = Symbol('setSignUpRecordStateEventBusKey');