import { http } from '@kit.NetworkKit';
import fs from '@ohos.file.fs';
import { request } from './request';

const serverUrl = 'http://x.x.x.x:3000/get_sign_url'; // 获取签名URL的服务器URL

/**
 * getSignUrl返回数据
 */
export interface ISignUrlResult {
  /** 签名URL */
  SignedUrl: string;
  /** 签名计算头 */
  ActualSignedRequestHeaders: object;
}

/**
 * 获取签名URL
 * @param fileName 文件名称
 * @param req 用于生成V4签名URL的请求信息
 * @param req.method 请求方式
 * @param [req.headers] 请求头
 * @param [req.queries] 请求查询参数
 * @param [req.additionalHeaders] 加签的请求头
 */
const getSignUrl = async (fileName: string, req: {
  method: 'GET' | 'POST' | 'PUT';
  headers?: Record<string, string | number>;
  queries?: Record<string, string>;
  additionalHeaders?: string[];
}): Promise<ISignUrlResult> => {
  console.info('in getSignUrl');

  try {
    const response = await request(serverUrl, {
      method: http.RequestMethod.POST,
      header: {
        'Content-Type': 'application/json'
      },
      extraData: {
        fileName,
        method: req.method,
        headers: req.headers,
      },
      expectDataType: http.HttpDataType.OBJECT
    }, 200);
    const result = response.result as ISignUrlResult;

    console.info('success getSignUrl');

    return result;
  } catch (err) {
    console.info('getSignUrl request error: ' + JSON.stringify(err));

    throw err;
  }
};

/**
 * PutObject
 * @param fileUri 文件URI
 */
const putObject = async (fileUri: string): Promise<void> => {
  console.info('in putObject');

  const fileInfo = await fs.open(fileUri, fs.OpenMode.READ_ONLY);
  const fileStat = await fs.stat(fileInfo.fd);
  let signUrlResult: ISignUrlResult;

  console.info('file name: ', fileInfo.name);

  try {
    // 获取PutObject的签名URL
    signUrlResult = await getSignUrl(fileInfo.name, {
      method: 'PUT',
      headers: {
        'Content-Length': fileStat.size
      },
      additionalHeaders: ['Content-Length']
    });
  } catch (e) {
    await fs.close(fileInfo.fd);

    throw e;
  }

  const data = new ArrayBuffer(fileStat.size);

  await fs.read(fileInfo.fd, data);
  await fs.close(fileInfo.fd);

  try {
    // 使用PutObject方法上传文件
    await request(signUrlResult.SignedUrl, {
      method: http.RequestMethod.PUT,
      header: signUrlResult.ActualSignedRequestHeaders,
      extraData: data
    }, 200);

    console.info('success putObject');
  } catch (err) {
    console.info('putObject request error: ' + JSON.stringify(err));

    throw err;
  }
};

export {
  getSignUrl,
  putObject
};
