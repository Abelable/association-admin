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
  legal_class_id: string;
  title: string;
}

export interface LegalItem {
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

export interface LegalsResult {
  list: LegalItem[];
  page: string;
  page_size: string;
  total: string;
}
export interface LegalForm {
  id: string;
  title: string;
  legal_class_id: number;
  sort: number;
  img: string;
  virtual_like: number;
  virtual_look: number;
  content: string;
}
