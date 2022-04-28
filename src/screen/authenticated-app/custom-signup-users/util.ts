import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const useCustomSignupUsersSearchParams = () => {
  const location = useLocation();
  const custom_event_id =
    location.state &&
    (location.state as { custom_event_id: string }).custom_event_id
      ? (location.state as { custom_event_id: string }).custom_event_id
      : "";
  const [params, setParams] = useUrlQueryParams([
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
        custom_event_id,
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
        ...params,
      }),
      [custom_event_id, params]
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
