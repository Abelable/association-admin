import { QueryKey, useMutation, useQuery } from "react-query";
import {
  PortraitForm,
  PortraitsResult,
  PortraitsSearchParams,
} from "types/credit-portrait";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useEvaluations = (params: Partial<PortraitsSearchParams>) => {
  const client = useHttp();
  return useQuery<PortraitsResult>(["evaluations", params], () =>
    client("/api/admin/company-evaluation/company-evaluation-list", {
      data: params,
    })
  );
};

export const useAddPortrait = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/service-library/article-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditPortrait = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/service-library/article-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeletePortrait = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/service-library/article-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
