export interface LivesSearchParams {
  page: number;
  page_size: number;
}

export interface Live {
  id: string;
  title: string;
  cover: string;
  replay_url: string;
  address: string;
  company_name: string;
  platform: string;
  sort: string;
  s_time: string;
  e_time: string;
}

export interface LivesResult {
  list: Live[];
  page: string;
  page_size: string;
  total: string;
}
