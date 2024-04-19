export interface QueryParamsType {
  query: string;
  x: string;
  y: string;
  category_group_code: string;
  radius: number;
  size: number;
  page: number;
  [key: string]: string | number;
}
