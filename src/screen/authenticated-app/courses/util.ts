import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useCoursesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "category_id",
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

export const useCoursesQueryKey = () => {
  const [params] = useCoursesSearchParams();
  return ["courses", params];
};

export const useCourseModal = () => {
  const [{ courseCreate }, setCourseModalOpen] = useUrlQueryParams([
    "courseCreate",
  ]);
  const [{ editingCourseId }, setEditingCourseId] = useUrlQueryParams([
    "editingCourseId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setCourseModalOpen({ courseCreate: true }),
    [setCourseModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingCourseId({ editingCourseId: id }),
    [setEditingCourseId]
  );
  const close = useCallback(
    () => setUrlParams({ courseCreate: "", editingCourseId: "" }),
    [setUrlParams]
  );

  return {
    courseModalOpen: courseCreate === "true" || !!editingCourseId,
    editingCourseId,
    open,
    startEdit,
    close,
  };
};
