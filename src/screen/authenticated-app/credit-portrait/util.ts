import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const usePortraitsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "title",
    "company_name",
    "s_time",
    "e_time",
    "ps_time",
    "pe_time",
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

export const usePortraitsQueryKey = () => {
  const [params] = usePortraitsSearchParams();
  return ["portraits", params];
};

export const usePortraitModal = () => {
  const [{ portraitCreate }, setPortraitModalOpen] = useUrlQueryParams([
    "portraitCreate",
  ]);
  const [{ editingPortraitId }, setEditingPortraitId] = useUrlQueryParams([
    "editingPortraitId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setPortraitModalOpen({ portraitCreate: true }),
    [setPortraitModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingPortraitId({ editingPortraitId: id }),
    [setEditingPortraitId]
  );
  const close = useCallback(
    () => setUrlParams({ portraitCreate: "", editingPortraitId: "" }),
    [setUrlParams]
  );

  return {
    portraitModalOpen: portraitCreate === "true" || !!editingPortraitId,
    editingPortraitId,
    open,
    startEdit,
    close,
  };
};
