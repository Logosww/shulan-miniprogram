import { defineStore, createPinia } from "pinia";
import { watch } from "vue";
import Taro from "@tarojs/taro";

import type { Role, VolunteerWhitelistState } from "@/constants/value-enum";

interface IState {
  token?: string;
  role?: Role;
  city?: string;
  showLocationAuthModal?: boolean;
  searchHistory?: string[];
  notificationCount?: number;
  whitelistState?: VolunteerWhitelistState;
  studentcheckCode?: string;
}

const _storeCache: string = Taro.getStorageSync("store");
const storeCache: IState | null = _storeCache ? JSON.parse(_storeCache) : null;

const getInitialValue = <T = string>(key: keyof IState, defaultValue?: T) => {
  if (!storeCache) return defaultValue ?? void 0;
  return (storeCache["shulan-miniprogram"][key] ?? defaultValue ?? void 0) as T;
};

const useStore = defineStore("shulan-miniprogram", {
  state: (): IState => ({
    token: getInitialValue("token"),
    role: getInitialValue("role"),
    city: getInitialValue("city", "杭州"),
    showLocationAuthModal: getInitialValue("showLocationAuthModal", true),
    searchHistory: getInitialValue("searchHistory", []),
    notificationCount: getInitialValue("notificationCount", 0),
    whitelistState: getInitialValue("whitelistState"),
    studentcheckCode: getInitialValue("studentcheckCode"),
  }),
  actions: {
    selectCity(city: string) {
      this.city = city;
    },
    readNotification() {
      this.notificationCount > 0 && this.notificationCount--;
    },
    setStudentcheckCode(code?: string) {
      this.studentcheckCode = code;
    },
    signOut() {
      this.token = void 0;
    },
  },
});

const pinia = createPinia();

watch(
  pinia.state,
  (state) => Taro.setStorage({ key: "store", data: JSON.stringify(state) }),
  { deep: true }
);

export { useStore };
export default pinia;
