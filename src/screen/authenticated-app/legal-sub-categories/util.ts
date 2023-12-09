import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useLegalCategoriesSearchParams = () => {
  const [params, setParmas] = useUrlQueryParams([
    "parent_category_id",
    "parent_category_name",
    "page",
    "page_size",
  ]);
  return [
    useMemo(
      () => ({
        parent_category_name: params.parent_category_name,
        pid: Number(params.parent_category_id),
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
      }),
      [params]
    ),
    setParmas,
  ] as const;
};

export const useLegalCategoryModal = () => {
  const [{ legalCategoryCreate }, setLegalCategoriesModalOpen] =
    useUrlQueryParams(["legalCategoryCreate"]);
  const [{ editingLegalCategoryId }, setEditingLegalCategoryId] =
    useUrlQueryParams(["editingLegalCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setLegalCategoriesModalOpen({ legalCategoryCreate: true }),
    [setLegalCategoriesModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingLegalCategoryId({ editingLegalCategoryId: id }),
    [setEditingLegalCategoryId]
  );
  const close = useCallback(
    () => setUrlParams({ legalCategoryCreate: "", editingLegalCategoryId: "" }),
    [setUrlParams]
  );

  return {
    legalCategoryModalOpen:
      legalCategoryCreate === "true" || !!editingLegalCategoryId,
    editingLegalCategoryId,
    open,
    startEdit,
    close,
  };
};

export const useLegalCategoriesQueryKey = () => {
  const [params] = useLegalCategoriesSearchParams();
  return ["legalCategories", params];
};
