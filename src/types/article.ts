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
}

export interface ArticleBannersResult {
  list: ArticleBanner[];
  page: string;
  page_size: string;
  total: string;
}

export interface ArticlesSearchParams {
  page: number;
  page_size: number;
  article_class_id: string;
  title: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  class_name: string;
  sort: number;
  img: string;
  show_like: number;
  show_look: number;
  created_at: string;
  updated_at: string;
}

export interface ArticlesResult {
  list: ArticleItem[];
  page: string;
  page_size: string;
  total: string;
}
export interface ArticleForm {
  id: string;
  title: string;
  article_class_id: number;
  sort: number;
  img: string;
  virtual_like: number;
  virtual_look: number;
  content: string;
}
