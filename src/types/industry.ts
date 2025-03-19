export interface IndustryListSearchParams {
  page: number;
  page_size: number;
}

export interface IndustryItem {
  id: string;
  city_id: number;
  main: string;
  top: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface IndustryListResult {
  list: IndustryItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface Industry {
  id: string;
  city_id: number;
  main: string;
  top: string;
}
