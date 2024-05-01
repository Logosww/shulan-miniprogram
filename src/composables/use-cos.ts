import Taro, { options } from '@tarojs/taro';
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
  jsonParse?: boolean;
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

  const download = (options: Omit<DownloadOption, 'jsonParse'>) => {
    const { key, filePath: _filePath, disableCache } = options;
    const filePath = `${Taro.env.USER_DATA_PATH}/${_filePath || key}`;
    const fs = Taro.getFileSystemManager();

    return new Promise<string>((resolve, reject) => {

      const downloadAndCache = (): void => cos.getObjectUrl({
        Bucket: config.bucketName,
        Region: config.bucketRegion,
        Key: key,
        Sign: true,
      }, async (err, data) => {
          if (err) return reject(err);
          
          const res = await Taro.downloadFile({
            url: data.Url,
            // @ts-ignore
            useHighPerformanceMode: true,
            fail: err => reject(err),
          });
          const { statusCode, tempFilePath } = res;
          if(statusCode !== 200) return reject(res);

          if(disableCache) return resolve(tempFilePath);

          fs.readFile({
            filePath: tempFilePath,
            success: ({ data }) => {
              fs.writeFile({
                data,
                filePath,
                success: () => resolve(filePath),
                fail: e => reject(e),
              });
            },
            fail: e => reject(e),
          });
      });

      if(!disableCache) {
        return cos.headObject({
          Bucket: config.bucketName,
          Region: config.bucketRegion,
          Key: key,
        }, (err, data) => {
          if(err) {
            console.error(err);
            try {
              fs.accessSync(filePath);
              return resolve(filePath);
            } catch {
              return downloadAndCache();
            }
          };

          const { ETag } = data;
          const md5 = ETag.slice(1, ETag.length - 2);
          fs.getFileInfo({
            filePath,
            digestAlgorithm: 'md5',
            success: ({ digest: cacheMd5 }) => {
              md5 === cacheMd5 ? resolve(filePath) : downloadAndCache();
            },
            fail: downloadAndCache,
          });
        });
      }

      downloadAndCache();
    });
  };

  const downloadAndRead = <T = ArrayBuffer>(options: DownloadOption) => {
    const fs = Taro.getFileSystemManager();
    const { jsonParse } = options;

    const getFileData = (filePath: string) => new Promise<{ filePath: string, data: T }>((resolve, reject) => {
      fs.readFile({
        filePath,
        encoding: jsonParse ? 'utf8' : void 0,
        success: ({ data }) => resolve({
          filePath,
          data: jsonParse ? (JSON.parse(data as string) as T) : (data as T),
        }),
        fail: e => reject(e),
      })
    });

    return download(options).then(filePath => getFileData(filePath));
  };

  return { upload, download, downloadAndRead };
};