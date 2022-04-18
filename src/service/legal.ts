import { QueryKey, useMutation, useQuery } from "react-query";
import {
  LegalCategoriesResult,
  LegalCategoriesSearchParams,
  LegalCategory,
  LegalForm,
  LegalsResult,
  LegalsSearchParams,
} from "types/legal";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useLegalCategories = (params: LegalCategoriesSearchParams) => {
  const client = useHttp();
  return useQuery<LegalCategoriesResult>(["legalCategories", params], () =>
    client("/api/admin/legal/class-list", { data: params })
  );
};

export const useAddLegalCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LegalCategory>) =>
      client("/api/admin/legal/class-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditLegalCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LegalCategory>) =>
      client("/api/admin/legal/class-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLegalCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client("/api/admin/legal/class-del", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useLegals = (params: Partial<LegalsSearchParams>) => {
  const client = useHttp();
  return useQuery<LegalsResult>(["legals", params], () =>
    client("/api/admin/legal/legal-list", { data: params })
  );
};

export const useAddLegal = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LegalForm>) =>
      client("/api/admin/legal/legal-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditLegal = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LegalForm>) =>
      client("/api/admin/legal/legal-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLegal = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client("/api/admin/legal/legal-del", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useLegal = (id?: number) => {
  const client = useHttp();
  return useQuery<LegalForm>(
    ["legal", { id }],
    () => client("/api/admin/legal/legal-info", { data: { id } }),
    { enabled: !!id }
  );
};
