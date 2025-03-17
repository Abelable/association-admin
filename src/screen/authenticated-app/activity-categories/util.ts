import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useActivityCategoriesSearchParams = () => {
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

export const useActivityCategoriesQueryKey = () => {
  const [params] = useActivityCategoriesSearchParams();
  return ["activity_categories", params];
};

export const useActivityCategoryModal = () => {
  const [{ activityCategoryCreate }, setActivityCategoriesModalOpen] =
    useUrlQueryParams(["activityCategoryCreate"]);
  const [{ editingActivityCategoryId }, setEditingActivityCategoryId] =
    useUrlQueryParams(["editingActivityCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setActivityCategoriesModalOpen({ activityCategoryCreate: true }),
    [setActivityCategoriesModalOpen]
  );
  const startEdit = useCallback(
    (id: string) =>
      setEditingActivityCategoryId({ editingActivityCategoryId: id }),
    [setEditingActivityCategoryId]
  );
  const close = useCallback(
    () =>
      setUrlParams({
        activityCategoryCreate: "",
        editingActivityCategoryId: "",
      }),
    [setUrlParams]
  );

  return {
    activityCategoryModalOpen:
      activityCategoryCreate === "true" || !!editingActivityCategoryId,
    editingActivityCategoryId,
    open,
    startEdit,
    close,
  };
};
