export interface IncomesSearchParams {
  income_year: string;
}

export interface IncomeItem {
  id: string;
  year: string;
  month: string;
  member_income: string;
  project_income: string;
  service_income: string;
  other_income: string;
  total_income: string;
}

export interface IncomeTableItem {
  subject: string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  "10": string;
  "11": string;
  "12": string;
}

export interface IncomesResult {
  list: IncomeItem[];
}

export interface IncomeForm {
  apply_content_json: string;
}
