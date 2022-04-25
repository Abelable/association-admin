import { QueryKey, useMutation, useQuery } from "react-query";
import {
  CustomSignupsResult,
  CustomSignupsSearchParams,
  CustomSignup,
  CourseForm,
  CoursesResult,
  CoursesSearchParams,
} from "types/custom-signup";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useCustomSignups = (params: CustomSignupsSearchParams) => {
  const client = useHttp();
  return useQuery<CustomSignupsResult>(["courseAuthors", params], () =>
    client("/api/admin/class-room/author-list", { data: params })
  );
};

export const useAddCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CustomSignup>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CustomSignup>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CustomSignup>) =>
      client("/api/admin/class-room/author-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useCourses = (params: Partial<CoursesSearchParams>) => {
  const client = useHttp();
  return useQuery<CoursesResult>(["courses", params], () =>
    client("/api/admin/class-room/list", { data: params })
  );
};

export const useAddCourse = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CourseForm>) =>
      client("/api/admin/class-room/save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCourse = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CourseForm>) =>
      client("/api/admin/class-room/save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteCourse = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CourseForm>) =>
      client("/api/admin/class-room/save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
