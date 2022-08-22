import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useIncomesSearchParams = () => {
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
  const [params] = useIncomesSearchParams();
  return ["financials", params];
};

export const useIncomeModal = () => {
  const [{ editingIncomeIndex }, setEditingIncomeId] = useUrlQueryParams([
    "editingIncomeIndex",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (index: string) => setEditingIncomeId({ editingIncomeIndex: index }),
    [setEditingIncomeId]
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
