export interface EnterpriseConsultingListSearchParams {
  enterprise_id: number;
  page: number;
  page_size: number;
}

export interface EnterpriseConsulting {
  id: string;
  name: string;
  mobile: string;
  company_name: string;
  content: string;
  created_at: string;
}

export interface EnterpriseConsultingListResult {
  list: EnterpriseConsulting[];
  page: string;
  page_size: string;
  total: string;
}
