import { QueryKey, useMutation, useQuery } from "react-query";
import {
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
      data: { select_year: params.income_year },
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
