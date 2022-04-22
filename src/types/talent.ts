export interface GenderOption {
  value: number;
  desc: string;
}

export interface ExpertOption {
  id: string;
  title: string;
  status: number;
}

export interface CategoryOption {
  id: number;
  name: string;
}

export interface TalentsSearchParams {
  page: number;
  page_size: number;
  name: string;
  employer: string;
  department: string;
  expert_intent_id: number;
  talent_classification: number;
}

export interface TalentForm {
  image: { [key in string]: string }[];
  name: string;
  sex: number;
  id_number: string;
  political_status: string;
  graduated_school: string;
  profession: string;
  expert_intent_id: string[];
  talent_classification: number[];
  score: string;
  introduction: string;
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

export interface TalentListItem
  extends Omit<
    TalentForm,
    "image" | "expert_intent_id" | "talent_classification"
  > {
  id: string;
  image: string;
  created_at: string;
  expert_intent_id: string[];
  talent_classification: number;
}

export interface TalentItem {
  id: string;
  name: string;
  mobile: string;
  sex: string;
  employer: string;
  department: string;
  score: string;
  talent_classification: string;
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
