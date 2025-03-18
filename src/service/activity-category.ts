import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import type {
  CategoriesResult,
  CategoriesSearchParams,
  Category,
} from "types/category";

export const useActivityCategories = (
  params: Partial<CategoriesSearchParams>
) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["activity_categories", params], () =>
    client("/api/admin/activity-category/list", { data: params })
  );
};

export const useAddActivityCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("/api/admin/activity-category/save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditActivityCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("/api/admin/activity-category/save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteActivityCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("/api/admin/activity-category/save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useActivityCategoryOptions = () => {
  const client = useHttp();
  return useQuery<Category[]>(["activity_category_options"], () =>
    client("/api/admin/activity-category/options")
  );
};
