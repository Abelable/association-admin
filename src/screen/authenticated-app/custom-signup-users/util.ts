import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useCustomSignupUsersSearchParams = () => {
  const [params, setParmas] = useUrlQueryParams([
    "custom_event_id",
    "name",
    "mobile",
    "start_time",
    "end_time",
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
    setParmas,
  ] as const;
};

export const useCustomSignupUserModal = () => {
  const [{ customSignupUserCreate }, setCustomSignupUsersModalOpen] =
    useUrlQueryParams(["customSignupUserCreate"]);
  const [{ editingCustomSignupUserId }, setEditingCustomSignupUserId] =
    useUrlQueryParams(["editingCustomSignupUserId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setCustomSignupUsersModalOpen({ customSignupUserCreate: true }),
    [setCustomSignupUsersModalOpen]
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

export const useCustomSignupUsersQueryKey = () => {
  const [params] = useCustomSignupUsersSearchParams();
  return ["customSignupUsers", params];
};
