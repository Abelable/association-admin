import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useServicesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["name", "page", "page_size"]);
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

export const useServicesQueryKey = () => {
  const [params] = useServicesSearchParams();
  return ["services", params];
};

export const useServiceModal = () => {
  const [{ serviceCreate }, setServiceModalOpen] = useUrlQueryParams([
    "serviceCreate",
  ]);
  const [{ editingServiceId }, setEditingServiceId] = useUrlQueryParams([
    "editingServiceId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setServiceModalOpen({ serviceCreate: true }),
    [setServiceModalOpen]
  );
  const startEdit = useCallback(
    (id: string) => setEditingServiceId({ editingServiceId: id }),
    [setEditingServiceId]
  );
  const close = useCallback(
    () => setUrlParams({ serviceCreate: "", editingServiceId: "" }),
    [setUrlParams]
  );

  return {
    serviceModalOpen: serviceCreate === "true" || !!editingServiceId,
    editingServiceId,
    open,
    startEdit,
    close,
  };
};
