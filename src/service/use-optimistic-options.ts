import { QueryKey, useQueryClient } from "react-query";
import { ApplicationsItem } from "types/application";
import { ArticleCategory } from "types/article";

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

export const useAddApplicationConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: [
      { id: `${Number(old.list[0].id) + 1}`, is_deal: "0", ...target },
      ...old.list,
    ],
  }));

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
      target.ids.includes(item.id)
        ? { ...item, is_deal: "2", reject_mark: target.reject_mark }
        : item
    ),
  }));

export const useDeleteApplicationConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: old.list.filter((item: ApplicationsItem) => item.id !== target) || [],
  }));

export const useAddArticleCategoryConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: [{ id: `${Number(old.list[0].id) + 1}`, ...target }, ...old.list],
  }));

export const useEditArticleCategoryConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: old.list.map((item: ArticleCategory) =>
      item.id === target.id ? { ...item, ...target } : item
    ),
  }));

export const useDeleteArticleCategoryConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    list: old.list.filter((item: ArticleCategory) => item.id !== target) || [],
  }));
