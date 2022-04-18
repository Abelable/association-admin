export interface WisdomsSearchParams {
  page: number;
  page_size: number;
  name: string;
}

export interface WisdomItem {
  id: string;
  title: string;
  name: string;
  field: string;
  head_img: string;
  honor: string;
  content: string;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface WisdomsResult {
  list: WisdomItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface WisdomForm {
  id: string;
  name: string;
  title: string;
  field: string;
  honor: string;
  head_img: string;
  content: string;
  sort: number;
}
