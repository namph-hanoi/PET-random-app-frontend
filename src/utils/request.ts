import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';

export const refreshToken = (): Promise<string> => {
  const cookieKeyName = 'jk4n2jndk';
  return fetch(`${window.location.origin}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: getCookie(cookieKeyName),
    }),
  })
    .then((res) => res.json())
    .then((data) => data.accessToken)
    .catch((error) => console.error(error));
};

let isRefreshing = false;
let subscribers: Function[] = [];

function onRefreshed({ authorisationToken }: { authorisationToken: string }) {
  subscribers.map((cb: Function) => cb(authorisationToken));
}

function subscribeTokenRefresh(cb: any) {
  subscribers.push(cb);
}

const setupAxiosInterceptors = (): AxiosInstance => {
  const request = axios.create({
    baseURL: window.location.origin,
  });

  request.interceptors.response.use(null, (err) => {
    const {
      config,
      response: { status },
    } = err;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshToken().then((newTokens) => {
          isRefreshing = false;
          onRefreshed({ authorisationToken: newTokens });
          subscribers = [];
        });
      }
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(err);
  });

  return request;
};

export default setupAxiosInterceptors;
