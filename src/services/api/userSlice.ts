import { login } from '@/features/user/userSlice';
import { get, post } from '../http';
import { Action, Dispatch } from '@reduxjs/toolkit';
import { iUser } from '@/interfaces/Sign';

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

type SignRes = {
  message: string;
};

export const signOn = (json: SignOnReq): Promise<SignRes> => {
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

export const authInfo = (dispatch: Dispatch<iAction>): Promise<iUser> => {
  return get<iUser>('/auth/authInfo').then((res) => {
    dispatch(login(res));
    return new Promise((resolve) => {
      resolve(res);
    });
  });
};
