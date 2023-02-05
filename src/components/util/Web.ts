import axios, { type AxiosRequestConfig } from "axios";
import authTokenStore from "@/store/modules/authToken";
import { Constants, Log } from ".";
import LoginService from "@/services/login/LoginService";


axios.interceptors.request.use((config: AxiosRequestConfig): any => {
  const authStore = authTokenStore();
  const matchingExcludePaths = Constants.authExcludeApiPaths.filter(
    (value: string, index: number) => {
      config.url = config.url || "";
      return config.url.indexOf(value) > -1;
    }
  );

  if (
    matchingExcludePaths.length === 0 && config.headers
  ) {
    config.headers.Authorization = "Bearer " + authStore.getApiToken;
  }

  return config;
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },

  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error;
    const authStore = authTokenStore();
    const originalConfig = error.config;
    if (originalConfig.url.indexOf("/auth/token") < 0 && error.response) {
      if (error.response.status === 401) {
        if (!originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const accessToken = await LoginService.refreshAuthToken(
              authStore.getRefreshToken
            );

            error.config.headers["Authorization"] = `Bearer ${accessToken}`;
            return new Promise((resolve, reject) => {
              axios.request(originalConfig)
                .then(response => {
                  resolve(response);
                }).catch((err) => {
                  reject(err);
                });
            });
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
        else {
          LoginService.logout();
        }
      }
    }

    return Promise.reject(error);
  }
);

export type APISuccessCallback = (response: any) => any;
export type APIErrorCallback = (error: any) => any;
export type SSECallback = (event: any) => void;

function isSSECallback(obj: SSECallback): obj is SSECallback {
  return !!(obj as SSECallback);
}

export default class Web {
  public static BASE_URL: string | undefined = import.meta.env.VITE_BASE_URL;

  public static get(
    url: string,
    successCallback: APISuccessCallback,
    errorCallback?: APIErrorCallback
  ) {
    Web.getAbsolute(Web.BASE_URL + url, successCallback, errorCallback);
  }

  public static getAsync(
    url: string,
  ) {
    return Web.getAbsoluteAsync(Web.BASE_URL + url);
  }

  public static getAbsolute(
    url: string,
    successCallback: APISuccessCallback,
    errorCallback?: APIErrorCallback
  ) {
    axios
      .get(url)
      .then(successCallback)
      .catch(errorCallback);
  }

  public static getAbsoluteAsync(url: string) {
    return axios.get(url);
  }

  public static post(
    url: string,
    data: any,
    successCallback: APISuccessCallback,
    errorCallback?: APIErrorCallback,
    headers?: any
  ) {
    Web.postAbsolute(
      Web.BASE_URL + url,
      data,
      successCallback,
      errorCallback,
      headers
    );
  }

  public static postAbsolute(
    url: string,
    data: any,
    successCallback: APISuccessCallback,
    errorCallback?: APIErrorCallback,
    headers?: any
  ) {
    axios
      .post(url, data, headers)
      .then(successCallback)
      .catch(errorCallback);
  }

  public static postAsync(
    url: string, data: any,
  ) {
    return axios.post(
      Web.BASE_URL + url, data
    );
  }


  public static patch(
    url: string,
    data: any,
    successCallback: APISuccessCallback,
    errorCallback?: APIErrorCallback,
    headers?: any
  ) {
    Web.patchAbsolute(
      Web.BASE_URL + url,
      data,
      successCallback,
      errorCallback,
      headers
    );
  }


  public static patchAbsolute(
    url: string,
    data: any,
    successCallback: APISuccessCallback,
    errorCallback?: APIErrorCallback,
    headers?: any
  ) {
    axios
      .patch(url, data, headers)
      .then(successCallback)
      .catch(errorCallback);
  }


  public static navigate(url: string) {
    window.location.href = url;
  }

  public static sse(
    url: string,
    eventHandlerObject: any,
    messageCallback: SSECallback | null
  ): EventSource {
    const eventSource = new EventSource(Web.BASE_URL + url);

    for (const handler in eventHandlerObject) {
      if (isSSECallback(eventHandlerObject[handler])) {
        Log.info(`Handler ${handler} is SSE Callback`);

        eventSource.addEventListener(handler, eventHandlerObject[handler]);
      } else {
        Log.info(`Handler ${handler} not SSE Callback`);
      }
    }

    if (messageCallback) {
      eventSource.onmessage = messageCallback;
    }

    return eventSource;
  }


  public static downloadFile(fileRef: string) {
    const authStore = authTokenStore();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', Web.BASE_URL + '/upload/' + fileRef, true);
    xhr.setRequestHeader("Authorization", "Bearer " + authStore.getApiToken);
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
      if (this.status === 200) {
        const contentDisposition = xhr.getResponseHeader('Content-Disposition');

        let filename = '';
        
        if (contentDisposition?.length){
          filename = contentDisposition
          .split(';')[1]
          .trim()
          .split('=')[1]
          .replace(/['"]/g, '');
        }
        else {
          filename = fileRef;
        }

        const blob = this.response;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      }
    };
    xhr.send();
  }

}

