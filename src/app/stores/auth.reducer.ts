import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from '@ngrx/store';
import {AuthModel} from "../models/authentication/auth.model";
import {SessionStore} from "./session.store";

const sessionKey = 'user-auth';
const sessionStorage = new SessionStore<AuthModel>();

/**
 * State Interface of the Store
 */
export interface AuthState {
  authenticated: boolean;
  userAuth: AuthModel | undefined;
}

/**
 * Available Actions for the Reducer.
 */
export class AuthAction {
  /**
   * Actions to set data into the Reducer.
   * <p>Usage:</p>
   *  constructor(private authStore: Store<AuthState>) {
   *     this.authStore.dispatch(AuthReducer.set({userAuth: data}));
   *   }
   */
  public static set = createAction('[AUTH] Set', props<{ userAuth: AuthModel }>());
  public static reset = createAction('[AUTH] Reset');
  /**
   * Feature Selector to create GetActions. 'featureName' is important for the registration in app.module.ts.
   */
  private static featureSelector = createFeatureSelector<AuthState>('authStateReducer');
  /**
   * Actions to get data from the reducer.
   * <p>Usage:</p>
   *  constructor(private store: Store<State>) {
   *     this.store.select(AuthReducer.get).subscribe((data) => this.userAuth = data);
   *   }
   */
  public static isPresent = createSelector(AuthAction.featureSelector, (state) => state?.authenticated);
  public static get = createSelector(AuthAction.featureSelector, (state) => state?.userAuth);
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
  on(AuthAction.reset, (previousState): AuthState => {
    sessionStorage.removeObj(sessionKey);
    return {
      ...previousState,
      authenticated: false,
      userAuth: undefined
    };
  })
);
