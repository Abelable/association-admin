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

export interface ArticleBannersSearchParams {
  page: number;
  page_size: number;
  is_show: string;
  title: string;
}
export interface ArticleBanner {
  id: string;
  title: string;
  is_show: string;
  img: string;
  link_type: string;
  article_id: string;
  redirect_url: string;
  sort: string;
  s_time: string;
  e_time: string;
  status: string;
  created_at: string;
}

export interface ArticleBannersResult {
  list: ArticleBanner[];
  page: string;
  page_size: string;
  total: string;
}
