import { QueryKey, useMutation, useQuery } from "react-query";
import {
  ArticleBanner,
  ArticleBannersResult,
  ArticleBannersSearchParams,
  ArticleCategoriesResult,
  ArticleCategoriesSearchParams,
  ArticleCategory,
} from "types/article";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useArticleCategories = (params: ArticleCategoriesSearchParams) => {
  const client = useHttp();
  return useQuery<ArticleCategoriesResult>(["articleCategories", params], () =>
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
    useAddConfig(queryKey)
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
    useEditConfig(queryKey)
  );
};

export const useDeleteArticleCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client("/api/admin/article/class-del", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useArticleBanners = (
  params: Partial<ArticleBannersSearchParams>
) => {
  const client = useHttp();
  return useQuery<ArticleBannersResult>(["articleBanners", params], () =>
    client("/api/admin/banner/list", { data: params })
  );
};

export const useAddArticleBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ArticleBanner>) =>
      client("/api/admin/banner/save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditArticleBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ArticleBanner>) =>
      client("/api/admin/banner/save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteArticleBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client("/api/admin/banner/del", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
