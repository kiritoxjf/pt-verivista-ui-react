import { post } from '../http';

type iSendCodeReq = {
  email: string;
};

type CodeRes = {
  success: boolean;
};

// 发送邮箱验证码
export const sendSignCode = (json: iSendCodeReq): Promise<CodeRes> => {
  return post<CodeRes>('/com/signCode', json);
};

type SignOnReq = {
  email: string;
  password: string;
  code: string;
};

export const signOn = (json: SignOnReq): Promise<unknown> => {
  return post('/com/signOn', json);
};
