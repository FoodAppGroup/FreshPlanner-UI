import {createReducer, on} from '@ngrx/store';
import {AuthAction} from './auth.action';
import {JwtResponse} from "../models/jwt-response";

const STORAGE_KEY = 'jwt-data';

export interface AuthState {
  hasJwt: boolean;
  jwt?: JwtResponse;
}

const initialState: AuthState = {
  hasJwt: isJwtInBrowser(),
  jwt: getJwtFromBrowser()
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthAction.setJwt, (state, action): AuthState => {
    setJwtInBrowser(action.jwt);
    return {
      ...state,
      hasJwt: true,
      jwt: action.jwt
    };
  }),
  on(AuthAction.deleteJwt, (state, action): AuthState => {
    removeJwtInBrowser();
    return {
      ...state,
      hasJwt: false,
      jwt: undefined
    };
  })
);


function isJwtInBrowser(): boolean {
  return !!sessionStorage.getItem(STORAGE_KEY);
}

function getJwtFromBrowser(): JwtResponse | undefined {
  if (isJwtInBrowser()) {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) as string);
  } else {
    return undefined;
  }
}

function setJwtInBrowser(jwt: JwtResponse): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(jwt));
}

function removeJwtInBrowser(): void {
  if (isJwtInBrowser()) {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}
