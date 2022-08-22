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

export const useFinancialsQueryKey = () => {
  const [params] = useFinancialsSearchParams();
  return ["financials", params];
};

export const useFinancialModal = () => {
  const [{ editingFinancialIndex }, setEditingFinancialId] = useUrlQueryParams([
    "editingFinancialIndex",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const startEdit = useCallback(
    (index: string) => setEditingFinancialId({ editingFinancialIndex: index }),
    [setEditingFinancialId]
  );
  const close = useCallback(
    () => setUrlParams({ editingFinancialIndex: "" }),
    [setUrlParams]
  );

  return {
    financialModalOpen: !!editingFinancialIndex,
    editingFinancialIndex,
    startEdit,
    close,
  };
};
