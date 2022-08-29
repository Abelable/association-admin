export interface TrendsSearchParams {
  page: number;
  page_size: number;
  title: string;
  category_id: string;
}

export interface TrendItem {
  id: string;
  title: string;
  sort: number;
  status: number;
  introduction: string;
  content: string;
  is_show: string;
  created_at: string;
}

export interface TrendsResult {
  list: TrendItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface TrendForm {
  id: string;
  title: string;
  sort: number;
  status: number;
  introduction: string;
  content: string;
  is_show: string;
}
