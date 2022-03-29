import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { ApplicationsResult, ApplicationsItem } from "types/application";
import { ExpertOption, TalentsSearchParams } from "types/talents";
import {
  useAddApplicationConfig,
  useDealApplicationConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectApplicationConfig,
} from "./use-optimistic-options";

export const useExpertOptions = () => {
  const client = useHttp();
  return useQuery<ExpertOption[]>(["expertOptions"], () =>
    client("/api/admin/enter-apply/expert-intent", { method: "POST" })
  );
};

export const useTalents = (params: Partial<TalentsSearchParams>) => {
  const client = useHttp();
  return useQuery<ApplicationsResult>(["applications", params], () =>
    client("/api/admin/enter-apply/list", { data: { ...params } })
  );
};

export const useAddApplication = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ApplicationsItem>) =>
      client("/api/admin/enter-apply/store", {
        data: { apply_content_json: params.apply_content_json },
        method: "POST",
      }),
    useAddApplicationConfig(queryKey)
  );
};

export const useEditApplication = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ApplicationsItem>) =>
      client("/api/admin/enter-apply/store", {
        data: { id: params.id, apply_content_json: params.apply_content_json },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditApplicationLevel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, level_id }: Partial<ApplicationsItem>) =>
      client("/api/admin/enter-apply/modify-level", {
        data: { id, member_level: level_id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDealApplications = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: string[]) =>
      client("/api/admin/enter-apply/deal", {
        data: { ids: ids.join() },
        method: "POST",
      }),
    useDealApplicationConfig(queryKey)
  );
};

export const useRejectApplications = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ ids, reject_mark }: { ids: string[]; reject_mark: string }) =>
      client("/api/admin/enter-apply/reject", {
        data: { ids: ids.join(), reject_mark },
        method: "POST",
      }),
    useRejectApplicationConfig(queryKey)
  );
};

export const useDeleteApplication = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client("/api/admin/enter-apply/del", {
        data: { ids: id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
