import { IAward } from './AwardInterface';
export interface IPagination {
  limit: number;
  current_page: number;
  total_pages: number;
  data: IAward[]
}

export interface IAwardFindPagination {
  jwt: string;
  limit: number;
  page: number;
  minPoint: number;
  maxPoint: number;
  awardTypes: number[];
}