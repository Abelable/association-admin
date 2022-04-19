import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useCourseAuthorsSearchParams = () => {
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

export const useCourseAuthorModal = () => {
  const [{ courseAuthorCreate }, setCourseAuthorsModalOpen] = useUrlQueryParams(
    ["courseAuthorCreate"]
  );
  const [{ editingCourseAuthorId }, setEditingCourseAuthorId] =
    useUrlQueryParams(["editingCourseAuthorId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setCourseAuthorsModalOpen({ courseAuthorCreate: true }),
    [setCourseAuthorsModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingCourseAuthorId({ editingCourseAuthorId: id }),
    [setEditingCourseAuthorId]
  );
  const close = useCallback(
    () => setUrlParams({ courseAuthorCreate: "", editingCourseAuthorId: "" }),
    [setUrlParams]
  );

  return {
    courseAuthorModalOpen:
      courseAuthorCreate === "true" || !!editingCourseAuthorId,
    editingCourseAuthorId,
    open,
    startEdit,
    close,
  };
};

export const useCourseAuthorsQueryKey = () => {
  const [params] = useCourseAuthorsSearchParams();
  return ["legalCategories", params];
};
