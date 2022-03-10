export interface ArticleCategoriesSearchParams {
  page: number;
  page_size: number;
}

export interface ArticleCategory {
  id: string;
  title: string;
  sort: string;
}

export interface ArticleCategoriesResult {
  list: ArticleCategory[];
  page: string;
  page_size: string;
  total: string;
}
