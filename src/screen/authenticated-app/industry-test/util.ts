import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useTestsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "title",
    "category_id",
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

export const useTestsQueryKey = () => {
  const [params] = useTestsSearchParams();
  return ["services", params];
};

export const useTestModal = () => {
  const [{ serviceCreate }, setTestModalOpen] = useUrlQueryParams([
    "serviceCreate",
  ]);
  const [{ editingTestId }, setEditingTestId] = useUrlQueryParams([
    "editingTestId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setTestModalOpen({ serviceCreate: true }),
    [setTestModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingTestId({ editingTestId: id }),
    [setEditingTestId]
  );
  const close = useCallback(
    () => setUrlParams({ serviceCreate: "", editingTestId: "" }),
    [setUrlParams]
  );

  return {
    serviceModalOpen: serviceCreate === "true" || !!editingTestId,
    editingTestId,
    open,
    startEdit,
    close,
  };
};
