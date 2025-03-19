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

export const useCourseCategories = (
  params: Partial<CategoriesSearchParams>
) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["course_categories", params], () =>
    client("/api/admin/class-room-category/list", { data: params })
  );
};

export const useAddCourseCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("/api/admin/class-room-category/save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCourseCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("/api/admin/class-room-category/save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteCourseCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("/api/admin/class-room-category/save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useCourseCategoryOptions = () => {
  const client = useHttp();
  return useQuery<Category[]>(["course_category_options"], () =>
    client("/api/admin/class-room-category/options")
  );
};
