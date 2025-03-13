import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useOpenInfoListSearchParams = () => {
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

export const useOpenInfoListQueryKey = () => {
  const [params] = useOpenInfoListSearchParams();
  return ["open_info_list", params];
};

export const useOpenInfoModal = () => {
  const [{ openInfoCreate }, setOpenInfoModalOpen] = useUrlQueryParams([
    "openInfoCreate",
  ]);
  const [{ editingOpenInfoId }, setEditingOpenInfoId] = useUrlQueryParams([
    "editingOpenInfoId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setOpenInfoModalOpen({ openInfoCreate: true }),
    [setOpenInfoModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingOpenInfoId({ editingOpenInfoId: id }),
    [setEditingOpenInfoId]
  );
  const close = useCallback(
    () => setUrlParams({ openInfoCreate: "", editingOpenInfoId: "" }),
    [setUrlParams]
  );

  return {
    openInfoModalOpen: openInfoCreate === "true" || !!editingOpenInfoId,
    editingOpenInfoId,
    open,
    startEdit,
    close,
  };
};
