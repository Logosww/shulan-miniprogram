import Taro from '@tarojs/taro';
import COS from 'cos-wx-sdk-v5';
import { nanoid } from '@/utils';
import { COSBucketBaseUrl } from '@/constants';
import { useGetCOSBucketCredentials } from '@/composables/use-api';


type ProgressInfo = {
  loaded: number;
  total: number;
  speed: number;
  percent: number;
};
type DownloadOption = {
  key: string;
  filePath?: string;
  disableCache?: boolean;
};

const config = {
  bucketName: 'shulan-1323578300',
  publicBucketName: 'common-1323578300',
  bucketRegion: 'ap-shanghai'
};

let cos: COS;

export const useCOS = (
  onProgress?: (params: ProgressInfo) => void,
  returnUrl?: boolean
) => {

  let globalOnProgress = onProgress;

  if(!cos) cos = new COS({
    SimpleUploadMethod: 'putObject',
    async getAuthorization(_options: any, callback: Function) {
      const data = await useGetCOSBucketCredentials();
      const { credentials } = data;
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        StartTime: data.startTime,
        ExpiredTime: data.expiredTime
      });
      },
    }
  );

  const upload = (filePath: string, path?: string, onProgress?: (params: ProgressInfo) => void) => {
    if(!cos) return Promise.reject('COS 实例初始化失败');

    const extension = filePath.split('.').at(-1) || 'png';
    const generateKey = () => `image/${nanoid()}.${extension}`;

    return new Promise<string>(async (resolve, reject) => {
      try {
        const key = path ?? generateKey();
        await cos.uploadFile(
          {
            Bucket: config.bucketName,
            Region: config.bucketRegion,
            Key: key,
            FilePath: filePath,
            onProgress: onProgress ?? globalOnProgress
          }
        );
        resolve(returnUrl ? `${COSBucketBaseUrl}/${key}` : key);
      } catch(err) {
        reject(err);
      }
    });
  };

  const download = <T>({ key, filePath: _filePath, disableCache }: DownloadOption) => {
    const filePath = `${Taro.env.USER_DATA_PATH}/${_filePath || key}`;
    const fs = Taro.getFileSystemManager();

    return new Promise<T>((resolve, reject) => {

      const downloadAndCache = () => cos.getObjectUrl({
        Bucket: config.bucketName,
        Region: config.bucketRegion,
        Key: key,
        Sign: true,
      }, async (err, data) => {
          if (err) return reject(err);
          
          const res = await Taro.downloadFile({
            url: data.Url,
            fail: err => reject(err),
          });
          const { statusCode, tempFilePath } = res;
          if(statusCode !== 200) return reject(res);

          fs.readFile({
            filePath: tempFilePath,
            encoding: 'utf8',
            success: ({ data }) => {
              if(disableCache) return JSON.parse(data as string) as T;

              fs.writeFile({
                data,
                filePath,
                encoding: 'utf8',
                success: () => resolve(JSON.parse(data as string) as T),
                fail: e => reject(e),
              });
            },
            fail: e => reject(e),
          });
      });

      if(!disableCache) {
        return fs.readFile({ 
          filePath, 
          encoding: 'utf8',
          success: ({ data }) => resolve(JSON.parse(data as string) as T),
          fail: downloadAndCache,
        });
      }

      downloadAndCache();
    })
  };

  return { upload, download };
};