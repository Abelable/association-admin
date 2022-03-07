import { QueryKey, useQueryClient } from "react-query";
import { ApplicationsItem } from "types/application";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old: any) => any
) => {
  const queryClient = useQueryClient();
  return {
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: any) => callback(target, old));
      return { previousItems };
    },
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useEditApplicationsConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: old.list.map((item: ApplicationsItem) =>
      item.id === target.id ? { ...item, ...target } : item
    ),
  }));

export const useDealApplicationConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: old.list.map((item: ApplicationsItem) =>
      target.includes(item.id) ? { ...item, is_deal: "1" } : item
    ),
  }));

export const useRejectApplicationConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: old.list.map((item: ApplicationsItem) =>
      target.ids.includes(item.id) ? { ...item, is_deal: "2" } : item
    ),
  }));

export const useDeleteApplicationConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: old.list.filter((item: ApplicationsItem) => item.id !== target) || [],
  }));
