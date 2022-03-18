import {createAction, createFeatureSelector, createSelector, props} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import {JwtResponse} from "../models/jwt-response";

export class AuthAction {
  public static setJwt = createAction('[JWT] Add', props<{ jwt: JwtResponse }>());
  public static deleteJwt = createAction('[JWT] Remove');
  private static featureSelector = createFeatureSelector<AuthState>('authStateReducer');
  public static hasJwt = createSelector(AuthAction.featureSelector, (state) => state?.hasJwt);
  public static getJwt = createSelector(AuthAction.featureSelector, (state) => state?.jwt);
}
