import { QueryKey, useMutation, useQuery } from "react-query";
import type { Valuation, Tatistic, Stock } from "types/view";
import { useHttp } from "./http";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";

export const useTatistics = () => {
  const client = useHttp();
  return useQuery<{ list: Tatistic[] }>(["tatistics"], () =>
    client("/api/admin/statistic/list")
  );
};

export const useTatistic = (id: string) => {
  const client = useHttp();
  return useQuery<Tatistic>(
    ["tatistic", { id }],
    () => client("/api/admin/statistic/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useEditTatistic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Partial<Tatistic>) =>
      client("/api/admin/statistic/save", {
        data,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useValuations = () => {
  const client = useHttp();
  return useQuery<{ list: Valuation[] }>(["valuations"], () =>
    client("/api/admin/valuation/list")
  );
};

export const useAddValuation = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Partial<Valuation>) =>
      client("/api/admin/valuation/save", {
        data,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditValuation = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Partial<Valuation>) =>
      client("/api/admin/valuation/save", {
        data,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useStocks = () => {
  const client = useHttp();
  return useQuery<{ list: Stock[] }>(["stocks"], () =>
    client("/api/admin/stock/list")
  );
};

export const useStock = (id: string) => {
  const client = useHttp();
  return useQuery<Stock>(
    ["stock", { id }],
    () => client("/api/admin/stock/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useEditStock = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Partial<Stock>) =>
      client("/api/admin/stock/save", {
        data,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
