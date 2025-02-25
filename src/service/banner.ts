import { QueryKey, useMutation, useQuery } from "react-query";
import { Banner, BannersResult, BannersSearchParams } from "types/banner";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useBanners = (params: Partial<BannersSearchParams>) => {
  const client = useHttp();
  return useQuery<BannersResult>(["articleBanners", params], () =>
    client("/api/admin/banner/list", { data: params })
  );
};

export const useAddBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ s_time, e_time, ...params }: Partial<Banner>) =>
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

export const useEditBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ s_time, e_time, ...params }: Partial<Banner>) =>
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

export const useDeleteBanner = (queryKey: QueryKey) => {
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
