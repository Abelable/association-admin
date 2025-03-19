import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useAlbumListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "title",
    "city_id",
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

export const useAlbumListQueryKey = () => {
  const [params] = useAlbumListSearchParams();
  return ["album_list", params];
};

export const useAlbumModal = () => {
  const [{ albumCreate }, setAlbumModalOpen] = useUrlQueryParams([
    "albumCreate",
  ]);
  const [{ editingAlbumId }, setEditingAlbumId] = useUrlQueryParams([
    "editingAlbumId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setAlbumModalOpen({ albumCreate: true }),
    [setAlbumModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingAlbumId({ editingAlbumId: id }),
    [setEditingAlbumId]
  );
  const close = useCallback(
    () => setUrlParams({ albumCreate: "", editingAlbumId: "" }),
    [setUrlParams]
  );

  return {
    albumModalOpen: albumCreate === "true" || !!editingAlbumId,
    editingAlbumId,
    open,
    startEdit,
    close,
  };
};
