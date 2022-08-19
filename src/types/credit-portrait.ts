export interface PortraitsSearchParams {
  page: number;
  page_size: number;
  title: string;
  category_id: string;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface PortraitItem {
  id: string;
  title: string;
  image: string;
  sort: number;
  status: number;
  category_id: string;
  brief: string;
  content: string;
  is_show: string;
  created_at: string;
}

export interface PortraitsResult {
  list: PortraitItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface PortraitForm {
  id: string;
  title: string;
  image: string;
  sort: number;
  status: number;
  category_id: string;
  brief: string;
  content: string;
  is_show: string;
}
