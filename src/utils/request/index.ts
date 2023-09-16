import axios, { AxiosRequestConfig } from 'axios'
import { handleError, requestSuccess } from './error';

interface HttpConfigContext {
  notCheck: boolean;
}

interface AxiosConfig extends AxiosRequestConfig {
  context?: HttpConfigContext;
}

const VITE_BASE_URL = 'https://jsonplaceholder.typicode.com';

// 创建 axios 实例
const request = axios.create({
  baseURL: VITE_BASE_URL
})

request.interceptors.request.use((config) => {
  /* const headers: Record<string, any> = config.headers || {};
  if (!Object.prototype.hasOwnProperty.call(headers, StorageKeys.AuthORIZATION)) {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    headers.Authorization = `Bearer ${token}`;
  }
  config.headers = headers; */
  return config;
}, handleError);


request.interceptors.response.use(response => {
  /* const { data, config } = response;
  const notCheck = isNotCheck((config as AxiosConfig).context);
  if (notCheck || requestSuccess(data.code)) { // 后端的code
    return notCheck ? data : data.data ?? null;
  }
  return handleError(response); */

  if (requestSuccess(response.status)) {
    return response.data;
  }
  return handleError(response);
}, handleError);


function isNotCheck(context?: HttpConfigContext) {
  return !!context?.notCheck;
}

export default request;