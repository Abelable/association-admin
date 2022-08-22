import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useIncomesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["income_year"]);
  return [
    useMemo(
      () => ({
        income_year: params.income_year || `${new Date().getFullYear()}`,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useIncomesQueryKey = () => {
  const [params] = useIncomesSearchParams();
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
    financialModalOpen: !!editingIncomeIndex,
    editingIncomeIndex,
    startEdit,
    close,
  };
};
