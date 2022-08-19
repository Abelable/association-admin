export interface FinancialsSearchParams {
  select_year: string;
}

export interface FinancialItem {
  id: string;
  year: string;
  month: string;
  member_income: string;
  project_income: string;
  service_income: string;
  other_income: string;
  total_income: string;
}

export interface FinancialsResult {
  list: FinancialItem[];
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
