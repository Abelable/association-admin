import { QueryKey, useMutation, useQuery } from "react-query";
import { TestForm, TestsResult, TestsSearchParams } from "types/industry-test";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useTests = (params: Partial<TestsSearchParams>) => {
  const client = useHttp();
  return useQuery<TestsResult>(["tests", params], () =>
    client("/api/admin/detection/legal-list", { data: params })
  );
};

export const useAddTest = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TestForm>) =>
      client("/api/admin/test-library/article-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTest = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TestForm>) =>
      client("/api/admin/test-library/article-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTest = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TestForm>) =>
      client("/api/admin/test-library/article-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
