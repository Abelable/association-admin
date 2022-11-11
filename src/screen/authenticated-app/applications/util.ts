import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useMemo, useCallback } from "react";

export const useApplicationsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "company_code",
    "s_time",
    "e_time",
    "company_name",
    "email",
    "member_level",
    "is_deal",
    "evaluation",
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

export const useApplicationsQueryKey = () => {
  const [params] = useApplicationsSearchParams();
  return ["applications", params];
};

export const useApplicationModal = () => {
  const [{ applicationCreate }, setApplicationModalOpen] = useUrlQueryParams([
    "applicationCreate",
  ]);
  const [{ editingApplicationId }, setEditingApplicationId] = useUrlQueryParams(
    ["editingApplicationId"]
  );
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setApplicationModalOpen({ applicationCreate: true }),
    [setApplicationModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingApplicationId({ editingApplicationId: id }),
    [setEditingApplicationId]
  );
  const close = useCallback(
    () => setUrlParams({ applicationCreate: "", editingApplicationId: "" }),
    [setUrlParams]
  );

  return {
    applicationModalOpen:
      applicationCreate === "true" || !!editingApplicationId,
    editingApplicationId,
    open,
    startEdit,
    close,
  };
};
