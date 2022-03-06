export interface UsersSearchParams {
  page: number;
  page_size: number;
  nickname: string;
  s_time: string;
  e_time: string;
}

export interface User {
  id: string;
  avatar_url: string;
  nickname: string;
  gender: string;
  province: string;
  city: string;
  created_at: string;
}

export interface UsersResult {
  list: User[];
  page: string;
  page_size: string;
  total: string;
}
