import { useStore } from '@/store';
import Taro from '@tarojs/taro';

type RequestMehod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined;
type RequestBody = string | Record<string, any>;

interface ResData<T = void> {
  code: 0 | 1;
  data: T;
  msg: string;
};

const baseUrl = 'https://api.admin.buhuishangshu.cn';
const store = useStore();

const request = <T = void>(
  url: string, 
  method: RequestMehod, 
  data?: RequestBody,
  headers?: HeadersInit,
  disableBaseUrl?: boolean,
) => {
  url = disableBaseUrl ? url : (baseUrl + url);
  const header = {
    Authorization: store.token ?? '',
    Role: store.role ?? '',
    ...headers
  };

  return new Promise<T>((resolve, reject) => {
    Taro.request<ResData<T>>({
      url,
      method,
      data,
      header,
      timeout: 120000,
      // @ts-ignore
      useHighPerformanceMode: true,
      fail: e => {
        console.error(e);
        Taro.showToast({ icon: 'error', title: '网络错误' });
        reject(e);
      },
      success: (res) => {
        const { data: _data, statusCode } = res;
        if(statusCode === 200) {
          if(disableBaseUrl) return resolve(_data as T);

          const { code, msg, data } = _data;
          if(!code) return reject(msg);
          
          resolve(data);
        }
        else {
          switch(statusCode) {
            case 401: {
              Taro.showToast({ icon: 'error', title: '你还未登录' });
              return reject('Unauthorized');
            }
            case 403: {
              Taro.showToast({ icon: 'error', title: '你未被授权' });
              return reject('Unauthenticated');
            }
            default: reject(res.data);
          }
        }
      }
    });
  });
};

export const get = <T = void>(
  url: string, 
  params?: RequestBody, 
  headers?: HeadersInit,
  disableBaseUrl?: boolean,
) => request<T>(url, 'GET', params, headers, disableBaseUrl);

export const post = <T = void>(
  url: string,
  body?: RequestBody,
  headers?: HeadersInit,
  disableBaseUrl?: boolean,
) => request<T>(url, 'POST', body, headers, disableBaseUrl);

export const put = <T = void>(
  url: string,
  body?: RequestBody,
  headers?: HeadersInit,
  disableBaseUrl?: boolean,
) => request<T>(url, 'PUT', body, { 'Content-Type': 'application/json', ...headers }, disableBaseUrl);

export const del = <T = void>(
  url: string,
  body?: RequestBody,
  headers?: HeadersInit,
  disableBaseUrl?: boolean,
) => request<T>(url, 'DELETE', body, { 'Content-Type': 'application/json', ...headers }, disableBaseUrl);

