import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useArticleBannersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "is_show",
    "title",
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

export const useArticleBannersQueryKey = () => {
  const [params] = useArticleBannersSearchParams();
  return ["articleBanners", params];
};

export const useBannerModal = () => {
  const [{ bannerCreate }, setBannerModalOpen] = useUrlQueryParams([
    "bannerCreate",
  ]);
  const [{ editingBannerId }, setEditingBannerId] = useUrlQueryParams([
    "editingBannerId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setBannerModalOpen({ bannerCreate: true }),
    [setBannerModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingBannerId({ editingBannerId: id }),
    [setEditingBannerId]
  );
  const close = useCallback(
    () => setUrlParams({ bannerCreate: "", editingBannerId: "" }),
    [setUrlParams]
  );

  return {
    bannerModalOpen: bannerCreate === "true" || !!editingBannerId,
    editingBannerId,
    open,
    startEdit,
    close,
  };
};
