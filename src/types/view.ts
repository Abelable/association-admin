export interface Valuation {
  id: string;
  year: string;
  name: string;
  num: string;
}

export interface Tatistic {
  id: string;
  name: string;
  num: string;
  type: string;
  rate: string;
}

export interface Stock {
  id: string;
  type: string;
  in_province: string;
  out_province: string;
  international: string;
}
