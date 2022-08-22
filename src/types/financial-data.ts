export interface IncomesSearchParams {
  select_year: string;
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

export interface ExpendsSearchParams {
  select_year: string;
}

export interface ExpendItem {
  id: string;
  year: string;
  month: string;
  member_expend: string;
  technology_expend: string;
  entertain_expend: string;
  meeting_expend: string;
  travel_expend: string;
  other_expend: string;
  total_expend: string;
}

export interface ExpendTableItem {
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

export interface ExpendsResult {
  list: ExpendItem[];
}

export interface ExpendForm {
  apply_content_json: string;
}
