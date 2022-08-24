export interface ServicesSearchParams {
  page: number;
  page_size: number;
  title: string;
  category_id: string;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  sort: number;
  status: number;
  category_id: string;
  brief: string;
  content: string;
  created_at: string;
}

export interface ServicesResult {
  list: ServiceItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface ServiceForm {
  id: string;
  title: string;
  image: string;
  sort: number;
  status: number;
  category_id: string;
  brief: string;
  content: string;
}
