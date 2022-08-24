export interface CategoryOption {
  id: string;
  name: string;
}
export interface PortraitsSearchParams {
  title: string;
  company_name: string;
  s_time: string;
  e_time: string;
  ps_time: string;
  pe_time: string;
  page: number;
  page_size: number;
}
export interface PortraitItem {
  id: string;
  title: string;
  image: string;
  sort: number;
  status: number;
  evaluation: string;
  brief: string;
  content: string;
  is_show: string;
  created_at: string;
  promulgation_time: string;
}

export interface PortraitsResult {
  list: PortraitItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface PortraitForm {
  id: string;
  title: string;
  image: string;
  sort: number;
  status: number;
  evaluation: string;
  brief: string;
  content: string;
  is_show: string;
}
