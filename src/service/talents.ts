import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  ExpertOption,
  TalentItem,
  TalentsResult,
  TalentsSearchParams,
} from "types/talent";
import {
  useAddConfig,
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
  return useQuery<TalentsResult>(["talents", params], () =>
    client("/api/admin/enter-apply/personal-apply-list", {
      method: "POST",
      data: params,
    })
  );
};

export const useAddTalent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TalentItem>) =>
      client("/api/admin/enter-apply/personal-apply-store", {
        data: { apply_content_json: params.apply_content_json },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTalent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TalentItem>) =>
      client("/api/admin/enter-apply/personal-apply-store", {
        data: { id: params.id, apply_content_json: params.apply_content_json },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTalent = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: string) =>
      client("/api/admin/enter-apply/personal-apply-store", {
        data: { id, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
