export interface ISearchRes {
  black?: boolean;
  total?: number;
  email?: string;
  description?: string;
  date?: string;
}

// IReportForm 举报提交表单
export interface IReportForm {
  email: string;
  description: string;
}
