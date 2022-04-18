import { QueryKey, useMutation, useQuery } from "react-query";
import { WisdomForm, WisdomsResult, WisdomsSearchParams } from "types/wisdom";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useWisdoms = (params: Partial<WisdomsSearchParams>) => {
  const client = useHttp();
  return useQuery<WisdomsResult>(["wisdoms", params], () =>
    client("/api/admin/wisdom-library/article-list", { data: params })
  );
};

export const useAddWisdom = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<WisdomForm>) =>
      client("/api/admin/wisdom-library/article-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditWisdom = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<WisdomForm>) =>
      client("/api/admin/wisdom-library/article-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteWisdom = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<WisdomForm>) =>
      client("/api/admin/wisdom-library/article-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
