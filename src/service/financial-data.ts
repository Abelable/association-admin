import { QueryKey, useMutation, useQuery } from "react-query";
import {
  IncomeForm,
  IncomesResult,
  IncomesSearchParams,
} from "types/financial-data";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useRevenues = (params: Partial<IncomesSearchParams>) => {
  const client = useHttp();
  return useQuery<IncomesResult>(["revenues", params], () =>
    client("/api/admin/financial/financial-list", { data: params })
  );
};

export const useIncomes = (params: Partial<IncomesSearchParams>) => {
  const client = useHttp();
  return useQuery<IncomesResult>(["financials", params], () =>
    client("/api/admin/financial/financial-list", {
      data: params,
    })
  );
};

export const useAddIncome = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<IncomeForm>) =>
      client("/api/admin/service-library/article-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditIncome = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<IncomeForm>) =>
      client("/api/admin/service-library/article-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteIncome = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<IncomeForm>) =>
      client("/api/admin/service-library/article-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
