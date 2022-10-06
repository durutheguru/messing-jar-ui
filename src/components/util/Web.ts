import axios, { type AxiosRequestConfig } from "axios";
import authTokenStore from "@/store/modules/authToken/authToken";
import { Constants, Log } from ".";


axios.interceptors.request.use((config: AxiosRequestConfig): any => {
  const authStore = authTokenStore();
  const matchingExcludePaths = Constants.authExcludeApiPaths.filter(
    (value: string, index: number) => {
      config.url = config.url || "";
      return config.url.indexOf(value) > -1;
    }
  );

  if (
    matchingExcludePaths.length === 0 &&
    import.meta.env.VITE_BASE_URL &&
    config.url?.startsWith(import.meta.env.VITE_BASE_URL)
    && config.headers
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

  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error;
    const authStore = authTokenStore();
    if (error.response.status === 401 || error.response.status === 403) {
      if (authStore.loggedIn) {
        Web.navigate("/");
        Log.error("axiosError: " + JSON.stringify(error.response.status));
      }
    }
    Log.error("axiosError: " + JSON.stringify(error.response.status));
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
}

