import { iReportListRes } from '@/interfaces/Report';
import { get } from '../http';

export const getReportList = (email: string): Promise<iReportListRes> => {
  const params = {
    email: email,
  };
  return get<iReportListRes>('/auth/reportList', params);
};
