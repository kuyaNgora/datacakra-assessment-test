/**
 * Authentication Slice
 * =====================
 * This module provides a Redux slice for managing authentication state, including
 * user login, registration, and logout functionality.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from "./types";

/**
 * Interface for the authentication state.
 *
 * @interface AuthState
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @property {UserResponse | null} data - The user session data or null if not authenticated.
 */
interface AuthState {
  isAuthenticated: boolean;
  data: UserResponse | null;
}

/**
 * Initializes the authentication state with default values.
 *
 * @function defineInitialState
 * @returns {AuthState} The initial authentication state object.
 */
const defineInitialState = (): AuthState => ({
  isAuthenticated: false,
  data: null,
});

/**
 * Redux slice for authentication state management.
 *
 * @constant {import('@reduxjs/toolkit').Slice}
 * @description Contains the reducers and actions for authentication.
 */
export const authSlice = createSlice({
  name: "Auth",
  initialState: defineInitialState(),
  reducers: {
    /**
     * Action to log in the user.
     *
     * @action login
     * @param {AuthState} state - The current authentication state.
     * @param {PayloadAction<UserResponse>} action - The action payload containing user session data.
     * @description Sets the user session data and marks the user as authenticated.
     */
    login: (state: AuthState, action: PayloadAction<UserResponse>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },

    /**
     * Action to register a new user.
     *
     * @action register
     * @param {AuthState} state - The current authentication state.
     * @param {PayloadAction<UserResponse>} action - The action payload containing new user data.
     * @description Sets the user session data and marks the user as authenticated after registration.
     */
    register: (state: AuthState, action: PayloadAction<UserResponse>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },

    /**
     * Action to log out the user.
     *
     * @action logout
     * @param {AuthState} state - The current authentication state.
     * @description Clears the user session data and marks the user as unauthenticated.
     */
    logout: (state: AuthState) => {
      state.data = null;
      state.isAuthenticated = false;
    },
  },
});

/**
 * Authentication actions for Redux state management.
 *
 * @constant {Object} actions
 * @property {Function} login - Logs in the user.
 * @property {Function} register - Registers a new user.
 * @property {Function} logout - Logs out the user.
 */
export const { login, register, logout } = authSlice.actions;

/**
 * Authentication reducer for the Redux store.
 *
 * @constant {import('@reduxjs/toolkit').Reducer}
 * @description Handles the authentication state updates.
 */
export const authReducer = authSlice.reducer;
