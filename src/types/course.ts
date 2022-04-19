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
  category_id: string;
  title: string;
}

export interface CourseItem {
  id: string;
  title: string;
  category_id: string;
  sort: number;
  image: string;
  content: string;
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
  id: string;
  title: string;
  category_id: number;
  sort: number;
  image: string;
  content: string;
}
