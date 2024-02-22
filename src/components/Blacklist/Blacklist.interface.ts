export interface ISearchRes {
  black?: boolean;
  email?: string;
  reporter?: string;
  description?: string;
  date?: string;
}

// IReportForm 举报提交表单
export interface IReportForm {
  email: string;
  description: string;
}
