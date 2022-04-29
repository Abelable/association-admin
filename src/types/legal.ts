export interface LegalCategoriesSearchParams {
  page: number;
  page_size: number;
}

export interface LegalCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  sort: string;
  created_at: string;
  updated_at: string;
}

export interface LegalCategoriesResult {
  list: LegalCategory[];
  page: string;
  page_size: string;
  total: string;
}

export interface LegalsSearchParams {
  page: number;
  page_size: number;
  category_id: string;
  title: string;
}

export interface LegalItem {
  id: string;
  title: string;
  category_id: string;
  sort: number;
  image: string;
  content: string;
  effective_time: string;
  promulgation_time: string;
  created_at: string;
  updated_at: string;
}

export interface LegalsResult {
  list: LegalItem[];
  page: string;
  page_size: string;
  total: string;
}
export interface LegalForm {
  id: string;
  title: string;
  category_id: number;
  sort: number;
  image: string;
  content: string;
  effective_time: string;
  promulgation_time: string;
}
