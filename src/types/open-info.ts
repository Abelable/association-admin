export interface OpenInfoListSearchParams {
  page: number;
  page_size: number;
  title: string;
}

export interface OpenInfoItem {
  id: string;
  title: string;
  cover: string;
  content: string;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface OpenInfoListResult {
  list: OpenInfoItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface OpenInfo {
  id: string;
  title: string;
  cover: string;
  content: string;
  sort: number;
}
