import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useMemo, useCallback } from "react";

export const useTalentsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "s_time",
    "e_time",
    "name",
    "mobile",
    "email",
    "member_level",
    "is_deal",
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

export const useTalentsQueryKey = () => {
  const [params] = useTalentsSearchParams();
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
