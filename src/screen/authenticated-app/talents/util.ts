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
  return ["talents", params];
};

export const useTalentModal = () => {
  const [{ talentCreate }, setTalentModalOpen] = useUrlQueryParams([
    "talentCreate",
  ]);
  const [{ editingTalentId }, setEditingTalentId] = useUrlQueryParams([
    "editingTalentId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setTalentModalOpen({ talentCreate: true }),
    [setTalentModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingTalentId({ editingTalentId: id }),
    [setEditingTalentId]
  );
  const close = useCallback(
    () => setUrlParams({ talentCreate: "", editingTalentId: "" }),
    [setUrlParams]
  );

  return {
    talentModalOpen: talentCreate === "true" || !!editingTalentId,
    editingTalentId,
    open,
    startEdit,
    close,
  };
};
