import { QueryKey, useMutation, useQuery } from "react-query";
import { Live, LivesResult, LivesSearchParams } from "types/live";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useLives = (params: Partial<LivesSearchParams>) => {
  const client = useHttp();
  return useQuery<LivesResult>(["articleLives", params], () =>
    client("/api/admin/banner/list", { data: params })
  );
};

export const useAddLive = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ s_time, e_time, ...params }: Partial<Live>) =>
      client("/api/admin/banner/save", {
        data: {
          s_time: `${Number(s_time) * 1000}`,
          e_time: `${Number(e_time) * 1000}`,
          ...params,
        },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditLive = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ s_time, e_time, ...params }: Partial<Live>) =>
      client("/api/admin/banner/save", {
        data: {
          s_time: `${Number(s_time) * 1000}`,
          e_time: `${Number(e_time) * 1000}`,
          ...params,
        },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLive = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client("/api/admin/banner/del", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
