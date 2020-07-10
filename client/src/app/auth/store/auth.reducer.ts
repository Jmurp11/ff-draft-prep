import { User } from '../user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
  actionStatus: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
  actionStatus: false
};

export const authReducer = (state = initialState, action: AuthActions.AuthActions) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.id,
        action.payload.email,
        action.payload.username,
        action.payload.profileImage,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        loading: false,
        user,
        actionStatus: true
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        authError: null,
        user: null,
        actionStatus: false
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
        actionStatus: false
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        authError: action.payload,
        user: null,
        loading: false,
        actionStatus: false
      };
    case AuthActions.SIGNUP:
      return {
        ...state,
        authError: null,
        loading: false,
        user: null,
        actionStatus: true
      };
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
        actionStatus: false
      };
    case AuthActions.SIGNUP_FAIL:
      return {
        ...state,
        authError: action.payload,
        user: null,
        loading: false,
        actionStatus: false
      };
    case AuthActions.CONFIRMUSER:
      return {
        ...state,
        authError: null,
        loading: false,
        user: null,
        actionStatus: true
      };
    case AuthActions.CONFIRMUSER_START:
      return {
        ...state,
        authError: null,
        loading: true,
        actionStatus: false
      };
    case AuthActions.CONFIRMUSER_FAIL:
      return {
        ...state,
        authError: action.payload,
        user: null,
        loading: false,
        actionStatus: false
      };
    case AuthActions.CHANGEPASSWORD:
      return {
        ...state,
        authError: null,
        loading: false,
        user: null,
        actionStatus: true
      };
    case AuthActions.CHANGEPASSWORD_START:
      return {
        ...state,
        authError: null,
        loading: true,
        actionStatus: false
      };
    case AuthActions.CHANGEPASSWORD_FAIL:
      return {
        ...state,
        authError: action.payload,
        user: null,
        loading: false,
        actionStatus: false
      };
    case AuthActions.FORGOTPASSWORD:
      return {
        ...state,
        authError: null,
        loading: false,
        user: null,
        actionStatus: true
      };
    case AuthActions.FORGOTPASSWORD_START:
      return {
        ...state,
        authError: null,
        loading: true,
        actionStatus: false
      };
    case AuthActions.FORGOTPASSWORD_FAIL:
      return {
        ...state,
        authError: action.payload,
        user: null,
        loading: false,
        actionStatus: false
      };
    default:
      return state;
  }
}
