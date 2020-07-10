import { Action } from '@ngrx/store';

export const LOGIN_START = '[AUTH] Login Start';
export const LOGIN = '[AUTH] Login';
export const LOGIN_FAIL = '[AUTH] Login Fail';
export const LOGOUT = '[AUTH] Logout';
export const SIGNUP_START = '[AUTH] Signup Start';
export const SIGNUP = '[AUTH] Signup';
export const SIGNUP_FAIL = '[Auth] Signup Fail';
export const CONFIRMUSER_START = '[AUTH] Confirm User Start';
export const CONFIRMUSER = '[AUTH] Confirm User';
export const CONFIRMUSER_FAIL = '[Auth] Confirm User Fail';
export const CHANGEPASSWORD_START = '[AUTH] Change Password Start';
export const CHANGEPASSWORD = '[AUTH] Change Password';
export const CHANGEPASSWORD_FAIL = '[Auth] Change Password Fail';
export const FORGOTPASSWORD_START = '[AUTH] Forgot Password Start';
export const FORGOTPASSWORD = '[AUTH] Forgot Password';
export const FORGOTPASSWORD_FAIL = '[Auth] Forgot Password Fail';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: {
    id: string,
    email: string,
    username: string,
    profileImage: string,
    token: string,
    expirationDate: Date
  }) { }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {
    email: string,
    password: string
  }) { }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) { }
}


export class Logout implements Action {
  readonly type = LOGOUT;
}


export class Signup implements Action {
  readonly type = SIGNUP;

  constructor(public payload: string) { }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: {
    email: string,
    password: string,
    username: string,
    profileImage: string
  }) { }
}

export class SignupFail implements Action {
  readonly type = SIGNUP_FAIL;

  constructor(public payload: string) { }
}

export class ConfirmUser implements Action {
  readonly type = CONFIRMUSER;

  constructor(public payload: string) { }
}

export class ConfirmUserStart implements Action {
  readonly type = CONFIRMUSER_START;

  constructor(public payload: {
    token: string
  }) { }
}

export class ConfirmUserFail implements Action {
  readonly type = CONFIRMUSER_FAIL;

  constructor(public payload: string) { }
}

export class ChangePassword implements Action {
  readonly type = CHANGEPASSWORD;

  constructor(public payload: string) { }
}

export class ChangePasswordStart implements Action {
  readonly type = CHANGEPASSWORD_START;

  constructor(public payload: {
    token: string,
    password: string
  }) { }
}

export class ChangePasswordFail implements Action {
  readonly type = CHANGEPASSWORD_FAIL;

  constructor(public payload: string) { }
}

export class ForgotPassword implements Action {
  readonly type = FORGOTPASSWORD;

  constructor(public payload: string) { }
}

export class ForgotPasswordStart implements Action {
  readonly type = FORGOTPASSWORD_START;

  constructor(public payload: {
    email: string
  }) { }
}

export class ForgotPasswordFail implements Action {
  readonly type = FORGOTPASSWORD_FAIL;

  constructor(public payload: string) { }
}

export type AuthActions =
  Login | Logout | LoginStart | LoginFail | Signup | SignupStart | SignupFail |
  ConfirmUser | ConfirmUserStart | ConfirmUserFail |
  ChangePassword | ChangePasswordStart | ChangePasswordFail |
  ForgotPassword | ForgotPasswordStart | ForgotPasswordFail;
