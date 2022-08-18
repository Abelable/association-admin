export interface ServicesSearchParams {
  page: number;
  page_size: number;
  title: string;
  category_id: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  sort: number;
  status: number;
  category_id: string;
  content: string;
  is_show: string;
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
  content: string;
  is_show: string;
}
