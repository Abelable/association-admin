export interface BannersSearchParams {
  page: number;
  page_size: number;
  is_show: string;
  title: string;
}

export interface Banner {
  id: string;
  title: string;
  is_show: string;
  img: string;
  link_type: string;
  article_id: string;
  redirect_url: string;
  sort: string;
  s_time: string;
  e_time: string;
}

export interface BannersResult {
  list: Banner[];
  page: string;
  page_size: string;
  total: string;
}
