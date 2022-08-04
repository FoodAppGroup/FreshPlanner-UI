import {RecipeModel} from "../models/recipe/recipe.model";
import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from "@ngrx/store";

/**
 * State Interface of the Store
 */
export interface RecipeState {
  recipe: RecipeModel | undefined;
  recipeDraft: RecipeModel | undefined;
}

/**
 * Available Actions for the Reducer.
 */
export class RecipeAction {
  /**
   * Actions to set data into the Reducer.
   * <p>Usage:</p>
   *  constructor(private store: Store<State>) {
   *     this.store.dispatch(Action.set({data: data}));
   *   }
   */
  public static set = createAction('[RECIPE] Set Recipe', props<{ recipe: RecipeModel }>());
  public static setDraft = createAction('[RECIPE] Set Recipe Draft', props<{ recipe: RecipeModel }>())
  /**
   * Feature Selector to create GetActions. 'featureName' is important for the registration in app.module.ts.
   */
  private static featureSelector = createFeatureSelector<RecipeState>('recipeStateReducer');
  /**
   * Actions to get data from the reducer.
   * <p>Usage:</p>
   *  constructor(private store: Store<State>) {
   *     this.store.select(Action.get).subscribe((data) => this.data = data);
   *   }
   */
  public static get = createSelector(RecipeAction.featureSelector, (state) => state?.recipe);
  public static getDraft = createSelector(RecipeAction.featureSelector, (state) => state?.recipeDraft);
}

/**
 * Reducer for the Store with explicit State. Defines logic of the Actions. Needs to be registered in the app.module.ts.
 */
export const RecipeReducer = createReducer<RecipeState>(
  // Initial State
  {
    recipe: undefined,
    recipeDraft: undefined
  },
  // Action 1 (set)
  on(RecipeAction.set, (previousState, actionProps): RecipeState => {
    return {
      ...previousState,
      recipe: actionProps.recipe
    };
  }),
  // Action 2 (setDraft)
  on(RecipeAction.setDraft, (previousState, actionProps): RecipeState => {
    return {
      ...previousState,
      recipeDraft: actionProps.recipe
    };
  })
);
