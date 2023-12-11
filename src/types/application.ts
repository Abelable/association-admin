export interface LevelOption {
  id: number;
  level: number;
  name: string;
}

export interface StatusOption {
  id: number;
  value: string;
  name: string;
}

export interface EvaluationOption {
  name: string;
  value: string;
  subOptions?: EvaluationOption[];
}

export interface ApplicationsSearchParams {
  page: number;
  page_size: number;
  company_name: string;
  email: string;
  member_level: number;
  evaluation: string;
  is_deal: string;
  s_time: string;
  e_time: string;
}

export interface ApplicationForm {
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
  _mobile: string;
  contacter_name: string;
  contacter_job_title: string;
  contacter_mobile: string;
  license: { [key in string]: string }[];
  member_count: string;
  operator_count: string;
  member_level: number;
  short_name: string;
  region: string[];
  longitude: number;
  latitude: number;
  registration_time: string;
  evaluation: string;
  introduction: string;
  logo: string;
}

export interface ApplicationsItem {
  id: string;
  company_name: string;
  level_id: string;
  level_name: string;
  contacter_name: string;
  contacter_mobile: string;
  email: string;
  is_deal: string;
  reject_mark: string;
  short_name: string;
  address: string;
  longitude: number;
  latitude: number;
  registration_time: string;
  evaluation: string;
  introduction: string;
  logo: string;
  apply_content_json: string;
  created_at: string;
  url: string;
  number: string;
  certificate_status: string;
}
export interface ApplicationsResult {
  list: ApplicationsItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface Region {
  label: string;
  value: string;
  children?: Region[];
}
