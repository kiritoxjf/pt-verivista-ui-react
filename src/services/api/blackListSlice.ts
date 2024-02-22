import { IReportForm } from '@/components/Blacklist/Blacklist.interface';
import { get, post } from '../http';

type BlackList = {
  black?: boolean;
  email?: string;
  reporter?: string;
  description?: string;
  date?: string;
  lastTime?: string;
};

// 查人
export const getBlackApi = (email: string): Promise<BlackList> => {
  const params = {
    email: email
  };
  return get<BlackList>('/com/search', params);
};

// 挂人
export const reportApi = (form: IReportForm): Promise<unknown> => {
  return post('/auth/report', form);
};
