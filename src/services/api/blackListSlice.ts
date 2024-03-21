import { IReportForm, ISearchRes } from '@/components/Blacklist/Blacklist.interface';
import { get, post } from '../http';

// 查人
export const getBlackApi = (email: string): Promise<ISearchRes> => {
  const params = {
    email: email
  };
  return get<ISearchRes>('/com/search', params);
};

// 挂人
export const reportApi = (form: IReportForm): Promise<unknown> => {
  return post('/auth/report', form);
};
