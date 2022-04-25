import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useCustomSignupsSearchParams = () => {
  const [params, setParmas] = useUrlQueryParams(["page", "page_size"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
      }),
      [params]
    ),
    setParmas,
  ] as const;
};

export const useCustomSignupModal = () => {
  const [{ customSignupCreate }, setCustomSignupsModalOpen] = useUrlQueryParams(
    ["customSignupCreate"]
  );
  const [{ editingCustomSignupId }, setEditingCustomSignupId] =
    useUrlQueryParams(["editingCustomSignupId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setCustomSignupsModalOpen({ customSignupCreate: true }),
    [setCustomSignupsModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingCustomSignupId({ editingCustomSignupId: id }),
    [setEditingCustomSignupId]
  );
  const close = useCallback(
    () => setUrlParams({ customSignupCreate: "", editingCustomSignupId: "" }),
    [setUrlParams]
  );

  return {
    customSignupModalOpen:
      customSignupCreate === "true" || !!editingCustomSignupId,
    editingCustomSignupId,
    open,
    startEdit,
    close,
  };
};

export const useCustomSignupsQueryKey = () => {
  const [params] = useCustomSignupsSearchParams();
  return ["customSignups", params];
};
