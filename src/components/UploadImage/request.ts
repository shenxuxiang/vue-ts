import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosProgressEvent,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { message } from 'ant-design-vue';
const statusCode = {
  200: "200 OK",
  400: "400 Bad Request",
  401: "401 Unauthorized",
  403: "403 Forbidden",
  404: "404 Not Found",
  405: "405 Method Not Allowed",
  408: "408 Request Timeout",
  500: "500 Internal Server Error",
  501: "501 Not Implemented",
  502: "502 Bad Gateway",
  503: "503 Service Unavailable",
  504: "504 Gateway Timeout",
  505: "505 HTTP Version Not Supported",
  510: "510 Not Extended",
  511: "511 Network Authentication Required",
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: '',
  timeout: 60000,
  withCredentials: true,
};

let abortController = new AbortController();

function cancelRequest() {
  if (abortController) {
    abortController.abort();
    abortController = new AbortController();
  } else {
    abortController = new AbortController();
  }
}


type UploadProgress = (events: AxiosProgressEvent) => void;

class Request {
  public instance: AxiosInstance;
  public interceptorsRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;

  constructor(interceptorsRequest?: any) {
    this.instance = axios.create(defaultConfig);
    this.interceptorsRequest = interceptorsRequest || this.onRequestFulfull;

    this.instance.interceptors.request.use(this.interceptorsRequest.bind(this), this.onRequestReject.bind(this));
    this.instance.interceptors.response.use(this.onResponseFulFull.bind(this), this.onResponseReject.bind(this));
  }

  onRequestFulfull(config: InternalAxiosRequestConfig) {
    return {
      ...config,
    };
  }

  onRequestReject(error: Error) {
    return Promise.reject(error);
  }

  onResponseFulFull(response: AxiosResponse) {
    const { data } = response;
    return data;
  }

  onResponseReject(error: AxiosError) {console.log(error);
    const { response, code, request } = error;
    if (response) {
      this.validateResponseStatus(response.status);
    } else if (code === 'ERR_CANCELED') {
      console.log(`${request.url}：请求已取消！`);
    } else if (!window.navigator.onLine) {
      message.error("网络连接失败！");
    } else {
      message.error("请求失败，请联系管理员！");
    }
    return Promise.reject(error);
  }

  validateResponseStatus(status: number) {
    switch (status) {
      case 401:
        message.error('用户未认证！');
        return;
      case 403:
        message.error('用户禁止访问！');
        return;
      default:
        message.error(statusCode[status]);
    }
  }

  post(url: string, data: any, onUploadProgress: UploadProgress, headers?: AxiosRequestConfig['headers']) {
    return this.instance.post(url, data, { onUploadProgress, headers });
  }
}

export default Request;
