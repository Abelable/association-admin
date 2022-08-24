import { QueryKey, useMutation, useQuery } from "react-query";
import {
  ServiceForm,
  ServicesResult,
  ServicesSearchParams,
} from "types/member-service";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useServices = (params: Partial<ServicesSearchParams>) => {
  const client = useHttp();
  return useQuery<ServicesResult>(["services", params], () =>
    client("/api/admin/member-service/legal-list", { data: params })
  );
};

export const useAddService = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ServiceForm>) =>
      client("/api/admin/member-service/legal-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditService = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ServiceForm>) =>
      client("/api/admin/member-service/legal-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteService = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ServiceForm>) =>
      client("/api/admin/member-service/legal-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
