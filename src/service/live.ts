import { QueryKey, useMutation, useQuery } from "react-query";
import type { Live, LivesResult, LivesSearchParams } from "types/live";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils";

export const useLives = (params: Partial<LivesSearchParams>) => {
  const client = useHttp();
  return useQuery<LivesResult>(["lives", params], () =>
    client("/api/admin/live-monitor/list", { data: params })
  );
};

export const useLive = (id: string) => {
  const client = useHttp();
  return useQuery<Live>(
    ["live", { id }],
    () => client("/api/admin/live-monitor/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddLive = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Live>) =>
      client("/api/admin/live-monitor/save", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditLive = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Live>) =>
      client("/api/admin/live-monitor/save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLive = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client("/api/admin/live-monitor/del", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
