import { QueryKey, useMutation, useQuery } from "react-query";
import {
  FinancialForm,
  FinancialsResult,
  FinancialsSearchParams,
} from "types/financial-data";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useRevenues = (params: Partial<FinancialsSearchParams>) => {
  const client = useHttp();
  return useQuery<FinancialsResult>(["revenues", params], () =>
    client("/api/admin/financial/financial-list", { data: params })
  );
};

export const useFinancials = (params: Partial<FinancialsSearchParams>) => {
  const client = useHttp();
  return useQuery<FinancialsResult>(["financials", params], () =>
    client("/api/admin/financial/financial-list", {
      data: params,
    })
  );
};

export const useAddFinancial = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<FinancialForm>) =>
      client("/api/admin/service-library/article-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditFinancial = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<FinancialForm>) =>
      client("/api/admin/service-library/article-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteFinancial = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<FinancialForm>) =>
      client("/api/admin/service-library/article-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
