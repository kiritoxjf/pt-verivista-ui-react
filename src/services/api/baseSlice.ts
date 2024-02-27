import { IDefense, IStatistic } from '@/features/base/baseSlice';
import { get, post } from '../http';

// IP记录
export const record = (): Promise<unknown> => {
  return post<unknown>('/com/record');
};

type ICP = {
  license: string;
};
// 查ICP
export const getIcp = (): Promise<ICP> => {
  return get<ICP>('/com/icp');
};

// 查询防御数据
export const getDefense = () => {
  return get<IDefense>('/com/defense');
};

// 获取统计数据
export const getStatistic = (): Promise<IStatistic> => {
  return get<IStatistic>('/com/statistic')
}
