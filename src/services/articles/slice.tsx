import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  data: Record<string, any>;
}

const defineInitialState = (): InitialState => ({
  data: {},
});

export const articleSlice = createSlice({
  name: "Article",
  initialState: defineInitialState(),
  reducers: {
    $get: (state: InitialState, action: PayloadAction<Record<any, string>>) => {
      state.data = {
        ...state.data,
        [action?.payload?.name]: action?.payload?.data,
      };
    },
  },
});

/**
 * Action creators for authentication state management.
 *
 * These actions are used to manage the authentication state in the Redux store.
 * They allow for logging the user in by setting the user session data,
 * and logging the user out by clearing the session.
 */
export const { $get } = articleSlice.actions;

/**
 * Reducer for the auth slice.
 * @constant {import('@reduxjs/toolkit').Reducer}
 */
export const articleReducer = articleSlice.reducer;
