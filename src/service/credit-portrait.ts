import { QueryKey, useMutation, useQuery } from "react-query";
import {
  PortraitForm,
  PortraitsResult,
  PortraitsSearchParams,
} from "types/credit-portrait";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useEvaluations = (params: Partial<PortraitsSearchParams>) => {
  const client = useHttp();
  return useQuery<PortraitsResult>(["evaluations", params], () =>
    client("/api/admin/company-evaluation/company-evaluation-list", {
      data: params,
    })
  );
};

export const useAddEvaluation = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/company-evaluation/company-evaluation-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditEvaluation = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/company-evaluation/company-evaluation-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteEvaluation = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/company-evaluation/company-evaluation-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useSentences = (params: Partial<PortraitsSearchParams>) => {
  const client = useHttp();
  return useQuery<PortraitsResult>(["sentences", params], () =>
    client("/api/admin/company-evaluation/company-sentence-list", {
      data: params,
    })
  );
};

export const useAddSentence = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/company-evaluation/company-sentence-save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditSentence = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/company-evaluation/company-sentence-save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteSentence = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PortraitForm>) =>
      client("/api/admin/company-evaluation/company-sentence-save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
