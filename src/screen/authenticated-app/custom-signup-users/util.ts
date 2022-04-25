import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useMemo, useCallback } from "react";

export const useCustomSignupUsersSearchParams = () => {
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

export const useCustomSignupUsersQueryKey = () => {
  const [params] = useCustomSignupUsersSearchParams();
  return ["customSignupUsers", params];
};

export const useCustomSignupUserModal = () => {
  const [{ customSignupUserCreate }, setCustomSignupUserModalOpen] =
    useUrlQueryParams(["customSignupUserCreate"]);
  const [{ editingCustomSignupUserId }, setEditingCustomSignupUserId] =
    useUrlQueryParams(["editingCustomSignupUserId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setCustomSignupUserModalOpen({ customSignupUserCreate: true }),
    [setCustomSignupUserModalOpen]
  );
  const startEdit = useCallback(
    (id: string) =>
      setEditingCustomSignupUserId({ editingCustomSignupUserId: id }),
    [setEditingCustomSignupUserId]
  );
  const close = useCallback(
    () =>
      setUrlParams({
        customSignupUserCreate: "",
        editingCustomSignupUserId: "",
      }),
    [setUrlParams]
  );

  return {
    customSignupUserModalOpen:
      customSignupUserCreate === "true" || !!editingCustomSignupUserId,
    editingCustomSignupUserId,
    open,
    startEdit,
    close,
  };
};
