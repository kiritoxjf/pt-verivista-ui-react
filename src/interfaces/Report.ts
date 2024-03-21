export interface iReportCard {
  id: number;
  description: string;
  date: string;
}

export interface iReportListRes {
  reportList: iReportCard[];
}
