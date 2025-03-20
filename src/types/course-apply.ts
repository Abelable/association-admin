export interface CourseApplyListSearchParams {
  enterprise_id: number;
  page: number;
  page_size: number;
}

export interface CourseApply {
  id: string;
  name: string;
  mobile: string;
  company_name: string;
  content: string;
  created_at: string;
}

export interface CourseApplyListResult {
  list: CourseApply[];
  page: string;
  page_size: string;
  total: string;
}
