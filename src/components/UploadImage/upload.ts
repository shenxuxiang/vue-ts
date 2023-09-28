type UploadOptions = {
  timeout?: number;
  withCredentials?: boolean;
  headers?: () => { [key: string]: any };
};

const defaultOptions = {
  timeout: 60000,
  withCredentials: true,
}

export default class Upload {
  public opts: UploadOptions;
  public headers: { [key: string]: any };
  public handleError!: (error: any) => void;
  public handleSuccess!: (response: any) => void;
  public handleProgress!: (progress: number) => void;

  constructor(options: UploadOptions = {}) {
    this.opts = {...defaultOptions, ...options};
    this.headers = {};

    if (typeof this.opts.headers === 'function') {
      const headers = this.opts.headers();
  
      const keys = Object.keys(headers);
      keys.forEach(key => this.headers[key] = headers[key]);
    }
  }

  public onProgress (callback: (progress: number) => void) {
    this.handleProgress = callback;
  }
  
  public onSuccess (callback: (response: any) => void) {
    this.handleSuccess = callback;
  }
  
  public onError (callback: (error: any) => void) {
    this.handleError = callback;
  }

  public create (url: string, method: string, query: any) {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.timeout = this.opts.timeout!;
    xhr.withCredentials = this.opts.withCredentials!;
    xhr.open(method, url);
  
    const keys = Object.keys(this.headers);
    keys.forEach(key => xhr.setRequestHeader(key, this.headers[key]));
  
    this.handleProgress && xhr.upload.addEventListener('progress', (event: any) => {
      const { lengthComputable, loaded, total } = event;
      if (lengthComputable) {
        this.handleProgress(Number((loaded / total).toFixed(2)));
      }
    });
  
    this.handleSuccess && xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.response);
      if (xhr.status >= 200 && xhr.status < 300) {
        this.handleSuccess(response);
      } else {
        this.handleError?.({
          response,
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    });
  
    this.handleError && xhr.addEventListener('error', () => {
      this.handleError({
        status: xhr.status,
        statusText: xhr.statusText,
        response: JSON.parse(xhr.response),
      });
    });
  
    this.handleError && xhr.addEventListener('timeout', () => {
      this.handleError(new Error('请求超时！'));
    });
  
    xhr.send(query);
  
    return xhr;
  }
}
