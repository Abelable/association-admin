import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useArticle } from "service/article";

export const useArticlesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "article_class_id",
    "title",
    "page",
    "page_size",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useArticlesQueryKey = () => {
  const [params] = useArticlesSearchParams();
  return ["articles", params];
};

export const useArticleModal = () => {
  const [{ articleCreate }, setArticleModalOpen] = useUrlQueryParams([
    "articleCreate",
  ]);
  const [{ editingArticleId }, setEditingArticleId] = useUrlQueryParams([
    "editingArticleId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingArticleForm, isLoading } = useArticle(
    Number(editingArticleId)
  );

  const open = useCallback(
    () => setArticleModalOpen({ articleCreate: true }),
    [setArticleModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingArticleId({ editingArticleId: id }),
    [setEditingArticleId]
  );
  const close = useCallback(
    () => setUrlParams({ articleCreate: "", editingArticleId: "" }),
    [setUrlParams]
  );

  return {
    articleModalOpen: articleCreate === "true" || !!editingArticleId,
    editingArticleId,
    editingArticleForm,
    isLoading,
    open,
    startEdit,
    close,
  };
};
