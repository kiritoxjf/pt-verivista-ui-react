export interface iSignOnForm {
  email: string;
  password: string;
  confirm: string;
  code: string;
  showPwd: boolean;
}

export interface iSignInForm {
  email: string;
  password: string;
  showPwd: boolean;
}

export interface iUser {
  id: number;
  name: string;
  email: string;
}
