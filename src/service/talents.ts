import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  ExpertOption,
  TalentItem,
  TalentResult,
  TalentsSearchParams,
} from "types/talent";
import {
  useAddApplicationConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useExpertOptions = () => {
  const client = useHttp();
  return useQuery<ExpertOption[]>(["expertOptions"], () =>
    client("/api/admin/enter-apply/expert-intent", { method: "POST" })
  );
};

export const useTalents = (params: Partial<TalentsSearchParams>) => {
  const client = useHttp();
  return useQuery<TalentResult>(["applications", params], () =>
    client("/api/admin/enter-apply/list", { data: { ...params } })
  );
};

export const useAddTalent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TalentItem>) =>
      client("/api/admin/enter-apply/store", {
        data: { apply_content_json: params.apply_content_json },
        method: "POST",
      }),
    useAddApplicationConfig(queryKey)
  );
};

export const useEditTalent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TalentItem>) =>
      client("/api/admin/enter-apply/store", {
        data: { id: params.id, apply_content_json: params.apply_content_json },
        method: "POST",
      }),
    useEditConfig(queryKey)
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
