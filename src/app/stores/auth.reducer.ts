import {createReducer, on} from '@ngrx/store';
import {AuthAction} from './auth.action';
import {UserAuthModel} from "../models/authentication/user-auth.model";
import {SessionStore} from "./session.store";

const sessionKey = 'user-auth';
const sessionStorage = new SessionStore<UserAuthModel>();

/**
 * State Interface the Store
 */
export interface AuthState {
  authenticated: boolean;
  userAuth: UserAuthModel | undefined;
}

/**
 * Reducer for the Store with explicit State. Defines logic of the Actions. Needs to be registered in the app.module.ts.
 */
export const AuthReducer = createReducer<AuthState>(
  // Initial State
  {
    authenticated: sessionStorage.isPresent(sessionKey),
    userAuth: sessionStorage.getObj(sessionKey)
  },
  // Action 1 (set)
  on(AuthAction.set, (previousState, actionProps): AuthState => {
    sessionStorage.setObj(sessionKey, actionProps.userAuth);
    return {
      ...previousState,
      authenticated: true,
      userAuth: actionProps.userAuth
    };
  }),
  // Action 2 (reset)
  on(AuthAction.reset, (previousState, actionProps): AuthState => {
    sessionStorage.removeObj(sessionKey);
    return {
      ...previousState,
      authenticated: false,
      userAuth: undefined
    };
  })
);
