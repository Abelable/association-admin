import { QueryKey, useMutation, useQuery } from "react-query";
import {
  Industry,
  IndustryListResult,
  IndustryListSearchParams,
} from "types/industry";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useIndustryList = (params: Partial<IndustryListSearchParams>) => {
  const client = useHttp();
  return useQuery<IndustryListResult>(["industry_list", params], () =>
    client("/api/admin/industry/list", { data: params })
  );
};

export const useAddIndustry = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Industry>) =>
      client("/api/admin/industry/save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditIndustry = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Industry>) =>
      client("/api/admin/industry/save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteIndustry = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Industry>) =>
      client("/api/admin/industry/save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
