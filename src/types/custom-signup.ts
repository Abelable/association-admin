export interface FormItem {
  id: number;
  type: number | undefined;
  required: boolean;
  name: string;
  options: string[] | undefined;
}

export interface CustomSignupsSearchParams {
  page: number;
  page_size: number;
}

export interface CustomSignup {
  id: string;
  title: string;
  registered_num: string;
  enter_num: string;
  start_time: string;
  end_time: string;
  remark: string;
  enter_from_json: string;
}

export interface CustomSignupsItem extends CustomSignup {
  activity_status: number;
  created_at: string;
  updated_at: string;
}

export interface CustomSignupFieldsValue
  extends Omit<
    CustomSignup,
    "enter_from_json" | "start_time" | "end_time" | "remark"
  > {
  dateRange: any[];
}
export interface CustomSignupForm {
  remark: string;
  enterFrom: FormItem[];
  fieldsValue: CustomSignupFieldsValue;
}

export interface CustomSignupsResult {
  list: CustomSignupsItem[];
  page: string;
  page_size: string;
  total: string;
}

export interface CustomSignupUsersSearchParams {
  custom_event_id: string;
  name: string;
  mobile: string;
  start_time: string;
  end_time: string;
  page: number;
  page_size: number;
}

export interface CustomSignupUser {
  id: string;
  title: string;
  registered_num: string;
  enter_num: string;
  start_time: string;
  end_time: string;
  remark: string;
  apply_content_json: { title: string; name: string; value: string }[];
  customEvent: { enter_from_json: string };
  activity_status: number;
  created_at: string;
  updated_at: string;
}

export interface CustomSignupUsersItem {
  id: string;
  title: string;
  registered_num: string;
  enter_num: string;
  start_time: string;
  end_time: string;
  remark: string;
  apply_content_json: { title: string; name: string; value: string }[];
  customEvent: { enter_from_json: string };
  activity_status: number;
  created_at: string;
  updated_at: string;
}

export interface CustomSignupUserForm {
  id: string;
  title: string;
  registered_num: string;
  enter_num: string;
  start_time: string;
  end_time: string;
  remark: string;
  enter_from_json: string;
  activity_status: number;
  created_at: string;
  updated_at: string;
}

export interface CustomSignupUsersResult {
  list: CustomSignupUser[];
  page: string;
  page_size: string;
  total: string;
}
