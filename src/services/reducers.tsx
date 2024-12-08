import { combineReducers } from "@reduxjs/toolkit";
import { activityReducer } from "./activity/slice";
import { authReducer } from "./auth/slice";
import { articleReducer } from "./articles/slice";

/**
 * Combines all slice reducers into a single root reducer.
 * @returns {function} A reducer function that invokes every slice reducer with its respective slice of state.
 */
const rootReducer = combineReducers({
  Activity: activityReducer,
  Auth: authReducer,
  Article: articleReducer,
});

export default rootReducer;
