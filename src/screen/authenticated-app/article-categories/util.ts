import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useArticleCategoriesSearchParams = () => {
  const [params, setParmas] = useUrlQueryParams(["page", "page_size"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
      }),
      [params]
    ),
    setParmas,
  ] as const;
};

export const useArticleCategoryModal = () => {
  const [{ articleCategoryCreate }, setArticleCategoriesModalOpen] =
    useUrlQueryParams(["articleCategoryCreate"]);
  const [{ editingArticleCategoryId }, setEditingArticleCategoryId] =
    useUrlQueryParams(["editingArticleCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setArticleCategoriesModalOpen({ articleCategoryCreate: true }),
    [setArticleCategoriesModalOpen]
  );
  const startEdit = useCallback(
    (id: string) =>
      setEditingArticleCategoryId({ editingArticleCategoryId: id }),
    [setEditingArticleCategoryId]
  );
  const close = useCallback(
    () =>
      setUrlParams({ articleCategoryCreate: "", editingArticleCategoryId: "" }),
    [setUrlParams]
  );

  return {
    articleCategoryModalOpen:
      articleCategoryCreate === "true" || !!editingArticleCategoryId,
    editingArticleCategoryId,
    open,
    startEdit,
    close,
  };
};

export const useArticleCategoriesQueryKey = () => {
  const [params] = useArticleCategoriesSearchParams();
  return ["articleCategories", params];
};
