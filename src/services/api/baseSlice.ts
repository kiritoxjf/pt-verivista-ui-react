import { get } from "../http";

type ICP = {
  license: string;
}
// 查ICP
export const getIcp = (): Promise<ICP> => {
  return get<ICP>('/icp')
}

type LastTime = {
  lastTime: string
}
// 查上次敏感行为时间
export const getLastTime = (): Promise<LastTime> => {
  return get<LastTime>('/lastTime')
}