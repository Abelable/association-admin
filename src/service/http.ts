import { useAuth } from "context/auth-context";
import * as auth from "./auth";
import qs from "qs";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      "Content-type": data ? "application/json" : "",
      token: token || "",
      ...headers,
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      const result = await response.json();
      if (result.code === "420") {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      if (["200", "201", "204"].includes(result.code)) return result.data;
      else return Promise.reject(result);
    } else return Promise.reject({ message: response.statusText });
  });
};

export const useHttp = () => {
  const { token } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token }),
    [token]
  );
};
