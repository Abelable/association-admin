import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useFinancialsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["select_year"]);
  return [
    useMemo(
      () => ({
        select_year: params.select_year || `${new Date().getFullYear()}`,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useIncomesQueryKey = () => {
  const [params] = useFinancialsSearchParams();
  return ["incomes", params];
};

export const useIncomeModal = () => {
  const [{ editingIncomeIndex }, setEditingIncomeIndex] = useUrlQueryParams([
    "editingIncomeIndex",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (index: string) => setEditingIncomeIndex({ editingIncomeIndex: index }),
    [setEditingIncomeIndex]
  );
  const close = useCallback(
    () => setUrlParams({ editingIncomeIndex: "" }),
    [setUrlParams]
  );

  return {
    incomeModalOpen: !!editingIncomeIndex,
    editingIncomeIndex,
    startEdit,
    close,
  };
};

export const useExpendsQueryKey = () => {
  const [params] = useFinancialsSearchParams();
  return ["expends", params];
};

export const useExpendModal = () => {
  const [{ editingExpendIndex }, setEditingExpendIndex] = useUrlQueryParams([
    "editingExpendIndex",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (index: string) => setEditingExpendIndex({ editingExpendIndex: index }),
    [setEditingExpendIndex]
  );
  const close = useCallback(
    () => setUrlParams({ editingExpendIndex: "" }),
    [setUrlParams]
  );

  return {
    expendModalOpen: !!editingExpendIndex,
    editingExpendIndex,
    startEdit,
    close,
  };
};
