import { QueryKey, useMutation, useQuery } from "react-query";
import { ArticleCategoriesSearchParams, ArticleCategory } from "types/article";
import { useHttp } from "./http";
import {
  useAddArticleCategoryConfig,
  useEditArticleCategoryConfig,
} from "./use-optimistic-options";

export const useArticleCategories = (params: ArticleCategoriesSearchParams) => {
  const client = useHttp();
  return useQuery(["articleCategories", params], () =>
    client("/api/admin/article/class-list", { data: params })
  );
};

export const useAddArticleCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ArticleCategory>) =>
      client("/api/admin/article/class-save", {
        data: params,
        method: "POST",
      }),
    useAddArticleCategoryConfig(queryKey)
  );
};

export const useEditArticleCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ArticleCategory>) =>
      client("/api/admin/article/class-save", {
        data: params,
        method: "POST",
      }),
    useEditArticleCategoryConfig(queryKey)
  );
};
