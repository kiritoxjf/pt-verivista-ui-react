import { login } from '@/features/user/userSlice';
import { get, post } from '../http';
import { Action, Dispatch } from '@reduxjs/toolkit';
import { iUser } from '@/interfaces/Sign';
import { ISendCodeForm, ISignOnForm } from '@/pages/Sign/SignOn/SignOn.interface';

type CodeRes = {
  success: boolean;
};

// 发送邮箱验证码
export const sendSignCode = (json: ISendCodeForm): Promise<CodeRes> => {
  return post<CodeRes>('/com/signCode', json);
};

type SignRes = {
  message: string;
};

export const signOn = (json: ISignOnForm): Promise<SignRes> => {
  return post('/com/signOn', json);
};

type SignInReq = {
  email: string;
  password: string;
};

export const signIn = (json: SignInReq): Promise<SignRes> => {
  return post('/com/signIn', json);
};

interface iAction extends Action {
  type: string;
  payload: iUser;
}

export const authInfo = async (dispatch: Dispatch<iAction>): Promise<iUser> => {
  const res = await get<iUser>('/auth/authInfo');
  dispatch(login(res));
  return await new Promise((resolve) => {
    resolve(res);
  });
};
