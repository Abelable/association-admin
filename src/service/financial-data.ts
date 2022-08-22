import { QueryKey, useMutation, useQuery } from "react-query";
import {
  ExpendForm,
  ExpendsResult,
  ExpendsSearchParams,
  IncomeForm,
  IncomesResult,
  IncomesSearchParams,
} from "types/financial-data";
import { useHttp } from "./http";
import { useEditConfig } from "./use-optimistic-options";

export const useIncomes = (params: Partial<IncomesSearchParams>) => {
  const client = useHttp();
  return useQuery<IncomesResult>(["incomes", params], () =>
    client("/api/admin/financial/financial-list", {
      data: params,
    })
  );
};

export const useEditIncome = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<IncomeForm>) =>
      client("/api/admin/financial/financial-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useExpends = (params: Partial<ExpendsSearchParams>) => {
  const client = useHttp();
  return useQuery<ExpendsResult>(["expends", params], () =>
    client("/api/admin/financial/financial-out-list", {
      data: params,
    })
  );
};

export const useEditExpend = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ExpendForm>) =>
      client("/api/admin/financial/financial-out-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
