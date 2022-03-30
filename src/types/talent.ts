export interface ExpertOption {
  id: number;
  title: string;
  status: number;
}

export interface TalentsSearchParams {
  page: number;
  page_size: number;
  name: string;
  employer: string;
  department: string;
  expert_intent_id: number;
}

export interface TalentForm {
  company_name: string;
  website_url: string;
  ICP: string;
  company_type: string[];
  website_type: string[];
  staff_count: string;
  gang_count: string;
  trade_commodity: string;
  trade_count: string;
  trade_amount: string;
  _name: string;
  job_title: string;
  political_status: string;
  _mobile: string;
  _email: string;
  contacter_name: string;
  contacter_job_title: string;
  contacter_mobile: string;
  license: { [key in string]: string }[];
  member_count: string;
  operator_count: string;
  member_level: number;
}

export interface TalentItem {
  id: string;
  name: string;
  mobile: string;
  sex: string;
  employer: string;
  department: string;
  score: string;
  expert_intent_id: string;
  apply_content_json: string;
  created_at: string;
}

export interface TalentsResult {
  list: TalentItem[];
  page: string;
  page_size: string;
  total: string;
}
