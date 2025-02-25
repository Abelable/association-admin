import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
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
        data: { status: 1, ...params },
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
        data: {
          status: 1,
          ...params,
        },
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

export const useEditTalentCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, talent_classification }: Partial<TalentItem>) =>
      client("/api/admin/enter-apply/modify-category", {
        data: { id, talent_classification },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useImportTalentData = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    ({ excel_file }: { excel_file: any }) =>
      client("/api/admin/enter-apply/personal-import", {
        data: { excel_file },
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  );
};
