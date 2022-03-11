import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "react-query";
import { ArticleBanner, ArticleBannersResult } from "types/article";
import moment from "moment";

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
  const editingBannerForm = useEditingBannerFrom(editingBannerId);

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
    editingBannerForm,
    open,
    startEdit,
    close,
  };
};

interface BannerForm extends Partial<Omit<ArticleBanner, "img">> {
  img: any[];
  linkInfo: string;
  dateRange: any[];
}

const useEditingBannerFrom = (id: string) => {
  const queryClient = useQueryClient();
  const bannersResult: ArticleBannersResult | undefined =
    queryClient.getQueryData(useArticleBannersQueryKey());
  const editingBanner: ArticleBanner | undefined = bannersResult
    ? bannersResult.list.find((item) => item.id === id)
    : undefined;
  const editingBannerForm: BannerForm | undefined = editingBanner
    ? {
        title: editingBanner.title,
        is_show: editingBanner.is_show,
        img: [{ url: editingBanner.img }],
        link_type: editingBanner.link_type === "0" ? "2" : "1",
        sort: editingBanner.sort,
        linkInfo:
          editingBanner.link_type === "1"
            ? editingBanner.article_id
            : editingBanner.redirect_url,
        dateRange: [
          moment(Number(editingBanner.s_time) * 1000),
          moment(Number(editingBanner.e_time) * 1000),
        ],
      }
    : undefined;
  return editingBannerForm;
};
