import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const usePortraitsSearchParams = () => {
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

export const usePortraitsQueryKey = () => {
  const [params] = usePortraitsSearchParams();
  return ["services", params];
};

export const usePortraitModal = () => {
  const [{ serviceCreate }, setPortraitModalOpen] = useUrlQueryParams([
    "serviceCreate",
  ]);
  const [{ editingPortraitId }, setEditingPortraitId] = useUrlQueryParams([
    "editingPortraitId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setPortraitModalOpen({ serviceCreate: true }),
    [setPortraitModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingPortraitId({ editingPortraitId: id }),
    [setEditingPortraitId]
  );
  const close = useCallback(
    () => setUrlParams({ serviceCreate: "", editingPortraitId: "" }),
    [setUrlParams]
  );

  return {
    serviceModalOpen: serviceCreate === "true" || !!editingPortraitId,
    editingPortraitId,
    open,
    startEdit,
    close,
  };
};
