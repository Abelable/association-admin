import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback } from "react";
import { useStock, useTatistic } from "service/view";

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

export const useTatisticsQueryKey = () => {
  return ["tatistics"];
};

export const useTatisticModal = () => {
  const [{ editingTatisticId }, setEditingTatisticId] = useUrlQueryParams([
    "editingTatisticId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingTatistic,
    isLoading,
    error,
  } = useTatistic(editingTatisticId);

  const startEdit = useCallback(
    (id: string) => setEditingTatisticId({ editingTatisticId: id }),
    [setEditingTatisticId]
  );
  const close = useCallback(
    () => setUrlParams({ editingTatisticId: "" }),
    [setUrlParams]
  );

  return {
    tatisticModalOpen: !!editingTatisticId,
    editingTatisticId,
    editingTatistic,
    isLoading,
    error,
    startEdit,
    close,
  };
};

export const useStocksQueryKey = () => {
  return ["stocks"];
};

export const useStockModal = () => {
  const [{ editingStockId }, setEditingStockId] = useUrlQueryParams([
    "editingStockId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingStock, isLoading, error } = useStock(editingStockId);

  const startEdit = useCallback(
    (id: string) => setEditingStockId({ editingStockId: id }),
    [setEditingStockId]
  );
  const close = useCallback(
    () => setUrlParams({ editingStockId: "" }),
    [setUrlParams]
  );

  return {
    stockModalOpen: !!editingStockId,
    editingStockId,
    editingStock,
    isLoading,
    error,
    startEdit,
    close,
  };
};
