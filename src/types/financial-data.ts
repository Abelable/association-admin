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

export interface TableItem {
  subject: string;
  january_data: number;
  february_data: number;
  march_data: number;
  april_data: number;
  may_data: number;
  june_data: number;
  july_data: number;
  august_data: number;
  september_data: number;
  october_data: number;
  november_data: number;
  december_data: number;
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
