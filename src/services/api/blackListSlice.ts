import { get } from '../http';

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
    email: email,
  };
  return get<BlackList>('/black', params);
};
