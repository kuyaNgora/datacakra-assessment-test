import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Action from "./action";

/**
 * Defines the initial state for the activity slice.
 * @returns {object} The initial state object.
 */
const defineInitialState = (): {
  services: Record<string, boolean>;
  processing: boolean;
} => ({
  services: {
    default: false,
  },
  processing: false,
});

/**
 * Slice for managing activity-related state.
 * @constant {import('@reduxjs/toolkit').Slice}
 */
const activitySlice = createSlice({
  name: "Activity",
  initialState: defineInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Action.$reset, () => {
        return defineInitialState();
      })
      .addCase(Action.$processing, (state, action: PayloadAction<string>) => {
        state.services = {
          ...state.services,
          [action.payload]: true,
        };
        state.processing = Object.values(state.services).reduce(
          (acc, v) => acc || v,
          false
        );
      })
      .addCase(Action.$done, (state, action: PayloadAction<string>) => {
        state.services = {
          ...state.services,
          [action.payload]: false,
        };
        state.processing = Object.values(state.services).reduce(
          (acc, v) => acc || v,
          false
        );
      });
  },
});

/**
 * Reducer for the activity slice.
 * @constant {import('@reduxjs/toolkit').Reducer}
 */
export const activityReducer = activitySlice.reducer;
