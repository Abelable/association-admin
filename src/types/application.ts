export interface ApplicationsSearchParams {
  page: number;
  page_size: number;
  name: string;
  mobile: string;
  email: string;
  member_level: number;
  s_time: string;
  e_time: string;
}

export interface ApplicationForm {
  company_name: string;
  website_url: string;
  ICP: string;
  company_type: string;
  website_type: string;
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
  license: string;
  member_count: string;
  operator_count: string;
  member_level: string;
}

export interface ApplicationsItem {
  id: string;
  company_name: string;
  level_id: string;
  name: string;
  mobile: string;
  email: string;
  is_deal: string;
  created_at: string;
  apply_content_json: string;
}

export interface ApplicationsResult {
  list: ApplicationsItem[];
  page: string;
  page_size: string;
  total: string;
}
