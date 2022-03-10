import { useQuery } from "react-query";
import { ArticleCategoriesSearchParams } from "types/article";
import { useHttp } from "./http";

export const useArticleCategories = (params: ArticleCategoriesSearchParams) => {
  const client = useHttp();
  return useQuery(["articleCategories", params], () =>
    client("/api/admin/article/class-list", { data: params })
  );
};
