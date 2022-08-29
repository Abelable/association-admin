import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useTrendsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["title", "page", "page_size"]);
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

export const useTrendsQueryKey = () => {
  const [params] = useTrendsSearchParams();
  return ["trends", params];
};

export const useTrendModal = () => {
  const [{ trendCreate }, setTrendModalOpen] = useUrlQueryParams([
    "trendCreate",
  ]);
  const [{ editingTrendId }, setEditingTrendId] = useUrlQueryParams([
    "editingTrendId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setTrendModalOpen({ trendCreate: true }),
    [setTrendModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingTrendId({ editingTrendId: id }),
    [setEditingTrendId]
  );
  const close = useCallback(
    () => setUrlParams({ trendCreate: "", editingTrendId: "" }),
    [setUrlParams]
  );

  return {
    trendModalOpen: trendCreate === "true" || !!editingTrendId,
    editingTrendId,
    open,
    startEdit,
    close,
  };
};
