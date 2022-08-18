export interface TestsSearchParams {
  page: number;
  page_size: number;
  title: string;
  category_id: string;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface TestItem {
  id: string;
  title: string;
  image: string;
  sort: number;
  status: number;
  category_id: string;
  brief: string;
  content: string;
  is_show: string;
  created_at: string;
}

export interface TestsResult {
  list: TestItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface TestForm {
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
