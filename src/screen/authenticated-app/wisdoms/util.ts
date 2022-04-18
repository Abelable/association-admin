import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useWisdomsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["name", "page", "page_size"]);
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

export const useWisdomsQueryKey = () => {
  const [params] = useWisdomsSearchParams();
  return ["wisdoms", params];
};

export const useWisdomModal = () => {
  const [{ wisdomCreate }, setWisdomModalOpen] = useUrlQueryParams([
    "wisdomCreate",
  ]);
  const [{ editingWisdomId }, setEditingWisdomId] = useUrlQueryParams([
    "editingWisdomId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setWisdomModalOpen({ wisdomCreate: true }),
    [setWisdomModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingWisdomId({ editingWisdomId: id }),
    [setEditingWisdomId]
  );
  const close = useCallback(
    () => setUrlParams({ wisdomCreate: "", editingWisdomId: "" }),
    [setUrlParams]
  );

  return {
    wisdomModalOpen: wisdomCreate === "true" || !!editingWisdomId,
    editingWisdomId,
    open,
    startEdit,
    close,
  };
};
