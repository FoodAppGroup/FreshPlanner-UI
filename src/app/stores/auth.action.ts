import {createAction, createFeatureSelector, createSelector, props} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import {UserAuthModel} from "../models/authentication/user-auth.model";

/**
 * Available Actions for the AuthReducer.
 */
export class AuthAction {
  /**
   * Actions to set data into the Reducer.
   * <p>Usage:</p>
   *  constructor(private authStore: Store<AuthState>) {
   *     this.authStore.dispatch(AuthAction.set({userAuth: data}));
   *   }
   */
  public static set = createAction('[AUTH] Set', props<{ userAuth: UserAuthModel }>());
  public static reset = createAction('[AUTH] Reset');
  /**
   * Feature Selector to create GetActions. 'featureName' is important for the registration in app.module.ts.
   */
  private static featureSelector = createFeatureSelector<AuthState>('authStateReducer');
  /**
   * Actions to get data from the reducer.
   * <p>Usage:</p>
   *  constructor(private authStore: Store<AuthState>) {
   *     this.authStore.select(AuthAction.get).subscribe((data) => this.userAuth = data);
   *   }
   */
  public static isPresent = createSelector(AuthAction.featureSelector, (state) => state?.authenticated);
  public static get = createSelector(AuthAction.featureSelector, (state) => state?.userAuth);
}
