export interface CourseAuthorsSearchParams {
  page: number;
  page_size: number;
}

export interface CourseAuthor {
  id: string;
  author_name: string;
  head_img: string;
  created_at: string;
}

export interface CourseAuthorsResult {
  list: CourseAuthor[];
  page: string;
  page_size: string;
  total: string;
}

export interface CoursesSearchParams {
  page: number;
  page_size: number;
  title: string;
  start_time: string;
  end_time: string;
}

export interface CourseItem {
  id: number;
  title: string;
  author_id: number;
  cover_img: string;
  media_url: string;
  duration: string;
  is_try: number;
  try_time: string;
  password: string;
  introduction: string;
  sort: number;
  tags: string[] | string;
  author: CourseAuthor;
  created_at: string;
  updated_at: string;
}

export interface CoursesResult {
  list: CourseItem[];
  page: string;
  page_size: string;
  total: string;
}
export interface CourseForm {
  id: number;
  title: string;
  author_id: number;
  cover_img: string;
  media_url: string;
  duration: string;
  is_try: number;
  try_time: string;
  password: string;
  introduction: string;
  sort: number;
  tags: string;
}
