import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useFinancialsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["select_year"]);
  return [
    useMemo(
      () => ({
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useFinancialsQueryKey = () => {
  const [params] = useFinancialsSearchParams();
  return ["services", params];
};

export const useFinancialModal = () => {
  const [{ serviceCreate }, setFinancialModalOpen] = useUrlQueryParams([
    "serviceCreate",
  ]);
  const [{ editingFinancialId }, setEditingFinancialId] = useUrlQueryParams([
    "editingFinancialId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setFinancialModalOpen({ serviceCreate: true }),
    [setFinancialModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingFinancialId({ editingFinancialId: id }),
    [setEditingFinancialId]
  );
  const close = useCallback(
    () => setUrlParams({ serviceCreate: "", editingFinancialId: "" }),
    [setUrlParams]
  );

  return {
    serviceModalOpen: serviceCreate === "true" || !!editingFinancialId,
    editingFinancialId,
    open,
    startEdit,
    close,
  };
};
