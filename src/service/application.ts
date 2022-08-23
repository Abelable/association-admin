import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import dayjs from "dayjs";
import { cleanObject } from "utils";
import {
  ApplicationsResult,
  ApplicationsSearchParams,
  LevelOption,
  ApplicationsItem,
} from "types/application";
import {
  useAddApplicationConfig,
  useDealApplicationConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectApplicationConfig,
} from "./use-optimistic-options";

export const useLevelOptions = () => {
  const client = useHttp();
  return useQuery<LevelOption[]>(["levelOptions"], () =>
    client("/api/admin/enter-apply/level-info")
  );
};

export const useApplications = (params: Partial<ApplicationsSearchParams>) => {
  const client = useHttp();
  return useQuery<ApplicationsResult>(["applications", params], () =>
    client("/api/admin/enter-apply/list", {
      data: {
        member_level: "",
        ...cleanObject({
          s_time: params.s_time ? dayjs(params.s_time).valueOf() : "",
          e_time: params.e_time ? dayjs(params.e_time).valueOf() : "",
          ...params,
        }),
      },
    })
  );
};

export const useAddApplication = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ApplicationsItem>) =>
      client("/api/admin/enter-apply/store", {
        data: params,
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
        data: params,
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

export const useEditApplicationEvaluation = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, evaluation }: Partial<ApplicationsItem>) =>
      client("/api/admin/enter-apply/evaluation-store", {
        data: { id, evaluation },
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
