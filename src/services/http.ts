import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Axios实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
});

interface iError {
  message: string;
}

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 封装 GET 请求
export const get = <T>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    instance
      .get<T>(url, { ...config, params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err.response?.data || '请求失败');
      });
  });
};

// 封装 POST 请求
export const post = <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    instance
      .post<T>(url, data, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err.response?.data || '请求失败');
      });
  });
};

// 封装 PUT 请求
export const put = <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    instance
      .put<T>(url, data, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError<iError>) => {
        reject(err.response?.data || '请求失败');
      });
  });
};

// 封装 DELETE 请求
export const dele = <T>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    instance
      .delete<T>(url, { ...config, params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: AxiosError) => {
        reject(err.response?.data || '请求失败');
      });
  });
};
