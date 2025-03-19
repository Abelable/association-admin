import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useCourseCategoriesSearchParams = () => {
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

export const useCourseCategoriesQueryKey = () => {
  const [params] = useCourseCategoriesSearchParams();
  return ["course_categories", params];
};

export const useCourseCategoryModal = () => {
  const [{ courseCategoryCreate }, setCourseCategoriesModalOpen] =
    useUrlQueryParams(["courseCategoryCreate"]);
  const [{ editingCourseCategoryId }, setEditingCourseCategoryId] =
    useUrlQueryParams(["editingCourseCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setCourseCategoriesModalOpen({ courseCategoryCreate: true }),
    [setCourseCategoriesModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingCourseCategoryId({ editingCourseCategoryId: id }),
    [setEditingCourseCategoryId]
  );
  const close = useCallback(
    () =>
      setUrlParams({
        courseCategoryCreate: "",
        editingCourseCategoryId: "",
      }),
    [setUrlParams]
  );

  return {
    courseCategoryModalOpen:
      courseCategoryCreate === "true" || !!editingCourseCategoryId,
    editingCourseCategoryId,
    open,
    startEdit,
    close,
  };
};
