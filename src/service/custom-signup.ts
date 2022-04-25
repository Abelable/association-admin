import { QueryKey, useMutation, useQuery } from "react-query";
import {
  CustomSignupsResult,
  CustomSignupsSearchParams,
  CustomSignup,
  CustomSignupUsersResult,
  CustomSignupUsersSearchParams,
  CustomSignupUser,
} from "types/custom-signup";
import { useHttp } from "./http";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";

export const useCustomSignups = (params: CustomSignupsSearchParams) => {
  const client = useHttp();
  return useQuery<CustomSignupsResult>(["customSignups", params], () =>
    client("/api/admin/enter-form/custom-event-list", { data: params })
  );
};

export const useAddCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CustomSignup>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CustomSignup>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useCustomSignupUsers = (params: CustomSignupUsersSearchParams) => {
  const client = useHttp();
  return useQuery<CustomSignupUsersResult>(["customSignupUsers", params], () =>
    client("/api/admin/enter-form/registered-list", { data: params })
  );
};

export const useAddCustomSignupUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CustomSignupUser>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditCustomSignupUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CustomSignupUser>) =>
      client("/api/admin/class-room/author-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
