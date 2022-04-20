import { QueryKey, useMutation, useQuery } from "react-query";
import {
  CourseAuthorsResult,
  CourseAuthorsSearchParams,
  CourseAuthor,
  CourseForm,
  CoursesResult,
  CoursesSearchParams,
} from "types/course";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useCourseAuthors = (params: CourseAuthorsSearchParams) => {
  const client = useHttp();
  return useQuery<CourseAuthorsResult>(["courseAuthors", params], () =>
    client("/api/admin/class-room/author-list", { data: params })
  );
};

export const useAddCourseAuthor = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CourseAuthor>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCourseAuthor = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CourseAuthor>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteCourseAuthor = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CourseAuthor>) =>
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
