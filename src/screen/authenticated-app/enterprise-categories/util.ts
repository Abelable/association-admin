import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useEnterpriseCategoriesSearchParams = () => {
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

export const useEnterpriseCategoriesQueryKey = () => {
  const [params] = useEnterpriseCategoriesSearchParams();
  return ["enterprise_categories", params];
};

export const useEnterpriseCategoryModal = () => {
  const [{ enterpriseCategoryCreate }, setEnterpriseCategoriesModalOpen] =
    useUrlQueryParams(["enterpriseCategoryCreate"]);
  const [{ editingEnterpriseCategoryId }, setEditingEnterpriseCategoryId] =
    useUrlQueryParams(["editingEnterpriseCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setEnterpriseCategoriesModalOpen({ enterpriseCategoryCreate: true }),
    [setEnterpriseCategoriesModalOpen]
  );
  const startEdit = useCallback(
    (id: string) =>
      setEditingEnterpriseCategoryId({ editingEnterpriseCategoryId: id }),
    [setEditingEnterpriseCategoryId]
  );
  const close = useCallback(
    () =>
      setUrlParams({
        enterpriseCategoryCreate: "",
        editingEnterpriseCategoryId: "",
      }),
    [setUrlParams]
  );

  return {
    enterpriseCategoryModalOpen:
      enterpriseCategoryCreate === "true" || !!editingEnterpriseCategoryId,
    editingEnterpriseCategoryId,
    open,
    startEdit,
    close,
  };
};
