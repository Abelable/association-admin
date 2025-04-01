export interface AlbumListSearchParams {
  page: number;
  page_size: number;
  title: string;
  city_id: number | undefined;
}

export interface AlbumItem {
  id: string;
  title: string;
  date: string;
  city_id: string;
  photo_list: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface AlbumListResult {
  list: AlbumItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface Album {
  id: string;
  title: string;
  city_id: string;
  date: string;
  photo_list: string;
}
