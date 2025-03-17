export interface CategoriesSearchParams {
  page: number;
  page_size: number;
}

export interface Category {
  id: string;
  name: string;
  sort: string;
  created_at: string;
  updated_at: string;
}

export interface CategoriesResult {
  list: Category[];
  page: string;
  page_size: string;
  total: string;
}
