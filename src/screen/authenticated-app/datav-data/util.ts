import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useValuationsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "page_size"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useValuationsQueryKey = () => {
  return ["valuations"];
};

export const useValuationModal = () => {
  const [{ editingValuationName }, setEditingValuationId] = useUrlQueryParams([
    "editingValuationName",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const startEdit = useCallback(
    (name: string) => setEditingValuationId({ editingValuationName: name }),
    [setEditingValuationId]
  );
  const close = useCallback(
    () => setUrlParams({ editingValuationName: "" }),
    [setUrlParams]
  );

  return {
    valuationModalOpen: !!editingValuationName,
    editingValuationName,
    startEdit,
    close,
  };
};
