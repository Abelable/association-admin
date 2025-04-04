import { QueryKey, useMutation, useQuery } from "react-query";
import type {
  CustomSignupsResult,
  CustomSignupsSearchParams,
  CustomSignupUsersResult,
  CustomSignupUsersSearchParams,
  CustomSignup,
  CustomSignupUsersItem,
} from "types/custom-signup";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useCustomSignups = (params: CustomSignupsSearchParams) => {
  const client = useHttp();
  return useQuery<CustomSignupsResult>(["customSignups", params], () =>
    client("/api/admin/enter-form/custom-event-list", { data: params })
  );
};

export const useAddCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: CustomSignup) =>
      client("/api/admin/enter-form/custom-event-save", {
        data: { ...params, status: 1 },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: CustomSignup) =>
      client("/api/admin/enter-form/custom-event-save", {
        data: { ...params, status: 1 },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: CustomSignup) =>
      client("/api/admin/enter-form/custom-event-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useEditCustomSignupStatus = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, activity_status }: { id: string; activity_status: number }) =>
      client("/api/admin/enter-form/custom-event-operate", {
        data: { id, action: activity_status },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useCustomSignupUsers = (
  params: Partial<CustomSignupUsersSearchParams>
) => {
  const client = useHttp();
  return useQuery<CustomSignupUsersResult>(["customSignupUsers", params], () =>
    client("/api/admin/enter-form/registered-list", {
      data: params,
    })
  );
};

export const useAddCustomSignupUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (
      params: Partial<
        Omit<CustomSignupUsersItem, "apply_content_json"> & {
          apply_content_json: string;
        }
      >
    ) =>
      client("/api/admin/enter-form/registered-save", {
        data: { ...params, status: 1 },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCustomSignupUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (
      params: Partial<
        Omit<CustomSignupUsersItem, "apply_content_json"> & {
          apply_content_json: string;
        }
      >
    ) =>
      client("/api/admin/enter-form/registered-save", {
        data: { ...params, status: 1 },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
