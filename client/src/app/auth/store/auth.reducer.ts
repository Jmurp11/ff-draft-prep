import { User } from '../user.model';
import * as AuthActions from './auth.action';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
}

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
          user
        };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
