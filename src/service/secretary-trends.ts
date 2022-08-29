import { QueryKey, useMutation, useQuery } from "react-query";
import {
  TrendForm,
  TrendsResult,
  TrendsSearchParams,
} from "types/secretary-trends";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useTrends = (params: Partial<TrendsSearchParams>) => {
  const client = useHttp();
  return useQuery<TrendsResult>(["trends", params], () =>
    client("/api/admin/dynamic/legal-list", { data: params })
  );
};

export const useAddTrend = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TrendForm>) =>
      client("/api/admin/dynamic/legal-save", {
        data: { image: "1", ...params },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTrend = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TrendForm>) =>
      client("/api/admin/dynamic/legal-save", {
        data: { image: "1", ...params },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTrend = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TrendForm>) =>
      client("/api/admin/dynamic/legal-save", {
        data: { image: "1", ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
