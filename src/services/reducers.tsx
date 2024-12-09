/**
 * Root Reducer combining all slice reducers for the application's state.
 *
 * This function combines multiple slice reducers into a single root reducer.
 * The individual slice reducers manage their respective state slices, and this root reducer integrates them.
 *
 * @returns {function} A reducer function that calls each slice reducer with its respective state slice.
 */
import { combineReducers } from "@reduxjs/toolkit";
import { activityReducer } from "./activity/slice";
import { authReducer } from "./auth/slice";
import { articleReducer } from "./articles/slice";

/**
 * Root reducer for combining slice reducers.
 *
 * This reducer integrates all individual slice reducers into a single root reducer.
 * It is used in the Redux store to manage the application's state.
 *
 * @constant {function}
 * @returns {function} A combined reducer that integrates the Activity, Auth, and Article slices.
 */
const rootReducer = combineReducers({
  Activity: activityReducer,
  Auth: authReducer,
  Article: articleReducer,
});

export default rootReducer;
