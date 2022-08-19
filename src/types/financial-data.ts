export interface FinancialsSearchParams {
  page: number;
  page_size: number;
  title: string;
  category_id: string;
}

export interface FinancialItem {
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

export interface FinancialsResult {
  list: FinancialItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface FinancialForm {
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
