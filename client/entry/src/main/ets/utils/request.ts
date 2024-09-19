import { http } from '@kit.NetworkKit';

const request = async (url: string, options: http.HttpRequestOptions, successCode: number[] | number) => {
  const httpRequest = http.createHttp();

  try {
    const httpResponse = await httpRequest.request(url, {
      ...options,
      priority: 1,
      connectTimeout: 60000,
      readTimeout: 60000,
      usingProtocol: http.HttpProtocol.HTTP1_1
    });

    if ((Array.isArray(successCode) && successCode.includes(httpResponse.responseCode)) || httpResponse.responseCode === successCode) {
      const requestID = httpResponse.header['x-obs-request-id'];

      console.info(`request success${requestID ? ', obs request ID: ' + requestID : ''}`);

      return httpResponse;
    } else {
      throw {
        code: httpResponse.responseCode,
        result: httpResponse.result.toString(),
        requestID: httpResponse.header['x-obs-request-id']
      };
    }
  } catch (err) {
    console.info('request error: ' + JSON.stringify(err));

    throw err;
  } finally {
    httpRequest.destroy();
  }
};

export {
  request
};
