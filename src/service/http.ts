import qs from "qs";

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
      if (["200", "201", "204"].includes(result.code)) return result.data;
      else return Promise.reject(result);
    } else return Promise.reject({ message: response.statusText });
  });
};
