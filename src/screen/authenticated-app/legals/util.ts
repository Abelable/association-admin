import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useLegalsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "category_id",
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

export const useLegalsQueryKey = () => {
  const [params] = useLegalsSearchParams();
  return ["legals", params];
};

export const useLegalModal = () => {
  const [{ legalCreate }, setLegalModalOpen] = useUrlQueryParams([
    "legalCreate",
  ]);
  const [{ editingLegalId }, setEditingLegalId] = useUrlQueryParams([
    "editingLegalId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setLegalModalOpen({ legalCreate: true }),
    [setLegalModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingLegalId({ editingLegalId: id }),
    [setEditingLegalId]
  );
  const close = useCallback(
    () => setUrlParams({ legalCreate: "", editingLegalId: "" }),
    [setUrlParams]
  );

  return {
    legalModalOpen: legalCreate === "true" || !!editingLegalId,
    editingLegalId,
    open,
    startEdit,
    close,
  };
};
