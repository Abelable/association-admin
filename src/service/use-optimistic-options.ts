import { QueryKey, useQueryClient } from "react-query";

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
    list: old.list.map((item: any) =>
      item.id === target.id ? { ...item, ...target } : item
    ),
  }));
