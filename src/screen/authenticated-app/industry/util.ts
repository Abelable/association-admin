import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useIndustryListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "page_size"]);
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

export const useIndustryListQueryKey = () => {
  const [params] = useIndustryListSearchParams();
  return ["industry_list", params];
};

export const useIndustryModal = () => {
  const [{ industryCreate }, setIndustryModalOpen] = useUrlQueryParams([
    "industryCreate",
  ]);
  const [{ editingIndustryId }, setEditingIndustryId] = useUrlQueryParams([
    "editingIndustryId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setIndustryModalOpen({ industryCreate: true }),
    [setIndustryModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingIndustryId({ editingIndustryId: id }),
    [setEditingIndustryId]
  );
  const close = useCallback(
    () => setUrlParams({ industryCreate: "", editingIndustryId: "" }),
    [setUrlParams]
  );

  return {
    industryModalOpen: industryCreate === "true" || !!editingIndustryId,
    editingIndustryId,
    open,
    startEdit,
    close,
  };
};
