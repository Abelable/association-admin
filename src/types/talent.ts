export interface ExpertOption {
  id: number;
  title: string;
  status: number;
}

export interface TalentsSearchParams {
  page: number;
  page_size: number;
  name: string;
  employer: string;
  department: string;
  expert_intent_id: number;
}

export interface TalentForm {
  image: { [key in string]: string }[];
  name: string;
  sex: string;
  id_number: string;
  political_status: string;
  graduated_school: string;
  profession: string;
  expert_intent_id: string;
  employer: string;
  department: string;
  position: string;
  work_time: string;
  work_experience: string;
  honor: string;
  professional_qualification: string;
  mobile: string;
  telephone: string;
  email: string;
  fax: string;
  wechat: string;
  QQ: string;
  address: string;
}

export interface TalentItem {
  id: string;
  name: string;
  mobile: string;
  sex: string;
  employer: string;
  department: string;
  score: string;
  expert_intent_id: string;
  apply_content_json: string;
  created_at: string;
}

export interface TalentsResult {
  list: TalentItem[];
  page: string;
  page_size: string;
  total: string;
}
