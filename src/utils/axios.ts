import type {
  AxiosRequestConfig,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import axios from "axios";
import { getToken, matchPath } from "@/utils";
import { message } from "ant-design-vue";
import router from "@/router";

enum ResponseCode {
  successCode = 0,
  overdueCode = 401,
}

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

let abortController = new AbortController();

function cancelRequest() {
  if (abortController) {
    abortController.abort();
    abortController = new AbortController();
  } else {
    abortController = new AbortController();
  }
} 

const defaultConfigOptions: AxiosRequestConfig = {
  baseURL: "",
  timeout: 60000,
  withCredentials: true,
};

class Request {
  public instance: AxiosInstance;
  public configOptions: AxiosRequestConfig;
  constructor(options?: AxiosRequestConfig) {
    this.configOptions = { ...defaultConfigOptions, ...options };

    this.instance = axios.create(this.configOptions);

    this.instance.interceptors.request.use(
      this.onRequestFulfull.bind(this),
      this.onRequestReject.bind(this),
    );

    this.instance.interceptors.response.use(
      this.onResponseFulFull.bind(this),
      this.onResponseReject.bind(this),
    );
  }

  onRequestFulfull(config: InternalAxiosRequestConfig) {
    return {
      ...config,
      // 用于取消请求的标记
      signal: abortController.signal,
      // 不要强制设置 contentType, 这样不利于 axios 的扩展，axios 可以根据 request body 自动定义 contentType 类型
      headers: { Authorization: getToken() } as any,
    };
  }

  onRequestReject(error: Error) {
    return Promise.reject(error);
  }

  onResponseFulFull(response: AxiosResponse) {
    const {
      data,
      headers,
      data: { code },
      config: { responseType },
    } = response;

    // 下载文件处理
    if (responseType === "blob") {
      const matched = /^attachment;\s*filename\*?=(?:utf-8'')?([^,]+)/.exec(
        headers["content-disposition"] ?? "",
      );
      let fileName = "default_";
      if (matched) fileName = decodeURIComponent(matched[1]);

      return Promise.resolve({ fileName, data });
    }

    // 接口异常处理（非登陆凭证失效场景）
    if (typeof code !== "undefined" && code !== ResponseCode.successCode) {
      message.error(data.message);
      return Promise.reject(data);
    }

    // 用户登录失效
    if (code && code === ResponseCode.overdueCode) {
      this.redirectToLogin();
      return Promise.reject(data);
    }

    return Promise.resolve(data);
  }

  onResponseReject(error: AxiosError) {
    const { response, code, request } = error;
    if (response) {
      this.checkStatus(response!.status);
    } else if (code === "ERR_CANCELED") {
      console.log(`${request.url}：请求已取消！`);
    } else if (!window.navigator.onLine) {
      message.error("网络连接失败！");
    } else {
      message.error("请求失败，请联系管理员！");
    }

    return Promise.reject(error);
  }

  redirectToLogin() {
    // 所有取消请求
    cancelRequest();
    // 清楚所有缓存数据。
    window.localStorage.clear();
    message.warning("用户登录失效，请重新登录！");

    const { push, currentRoute } = router;
    if (matchPath("/login", currentRoute.value.fullPath)) return;
    push("/login");
  }

  checkStatus(status: number) {
    switch (status) {
      case 401:
      case 403:
        this.redirectToLogin();
        break;
      default:
        message.error(statusCode[status as keyof typeof statusCode]);
    }
  }

  get(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.instance.get(url, { ...config, params });
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config);
  }

  getBlob(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.instance.get(url, { ...config, params, responseType: "blob" });
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config);
  }

  delete(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.delete(url, { ...config, data });
  }
}

export default new Request();
