import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useLive } from "service/live";

export const useLivesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "page_size"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useLivesQueryKey = () => {
  const [params] = useLivesSearchParams();
  return ["lives", params];
};

export const useLiveModal = () => {
  const [{ liveCreate }, setLiveModalOpen] = useUrlQueryParams(["liveCreate"]);
  const [{ editingLiveId }, setEditingLiveId] = useUrlQueryParams([
    "editingLiveId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingLive, isLoading, error } = useLive(editingLiveId);

  const open = useCallback(
    () => setLiveModalOpen({ liveCreate: true }),
    [setLiveModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingLiveId({ editingLiveId: id }),
    [setEditingLiveId]
  );
  const close = useCallback(
    () => setUrlParams({ liveCreate: "", editingLiveId: "" }),
    [setUrlParams]
  );

  return {
    liveModalOpen: liveCreate === "true" || !!editingLiveId,
    editingLiveId,
    editingLive,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};
