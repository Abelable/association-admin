import { QueryKey, useMutation, useQuery } from "react-query";
import {
  CustomSignupsResult,
  CustomSignupsSearchParams,
  CustomSignup,
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

export const useDeleteCustomSignup = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CustomSignup>) =>
      client("/api/admin/class-room/author-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
