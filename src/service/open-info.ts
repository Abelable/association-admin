import { QueryKey, useMutation, useQuery } from "react-query";
import {
  OpenInfo,
  OpenInfoListResult,
  OpenInfoListSearchParams,
} from "types/open-info";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useOpenInfoList = (params: Partial<OpenInfoListSearchParams>) => {
  const client = useHttp();
  return useQuery<OpenInfoListResult>(["open_info_list", params], () =>
    client("/api/admin/open-info/list", { data: params })
  );
};

export const useAddOpenInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<OpenInfo>) =>
      client("/api/admin/open-info/save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditOpenInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<OpenInfo>) =>
      client("/api/admin/open-info/save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteOpenInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<OpenInfo>) =>
      client("/api/admin/open-info/save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
