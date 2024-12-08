import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from "./types";

interface AuthState {
  /**
   * Indicates if the user is authenticated.
   * @type {boolean}
   */
  isAuthenticated: boolean;
  /**
   * The user session data or null if not authenticated.
   * @type {UserResponse | null}
   */
  data: UserResponse | null;
}

/**
 * Defines the initial state for the authentication slice.
 * @returns {AuthState} The initial state object.
 * @property {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @property {UserResponse | null} data - The user session data or null if not authenticated.
 */
const defineInitialState = (): AuthState => ({
  isAuthenticated: false,
  data: null,
});

/**
 * Authentication slice for managing authentication-related state.
 * @constant {import('@reduxjs/toolkit').Slice}
 */
export const authSlice = createSlice({
  name: "Auth",
  initialState: defineInitialState(),
  reducers: {
    /**
     * Login action to set the user session and mark as authenticated.
     * After login, the user session is saved, and the user is marked as authenticated.
     * @param {AuthState} state - The current authentication state.
     * @param {PayloadAction<UserResponse>} action - The login action with user session data.
     */
    login: (state: AuthState, action: PayloadAction<UserResponse>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },

    register: (state: AuthState, action: PayloadAction<UserResponse>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    /**
     * Logout action to clear the user session and mark as unauthenticated.
     * After logout, the user session is cleared, and the user is marked as not authenticated.
     * @param {AuthState} state - The current authentication state.
     */
    logout: (state: AuthState) => {
      state.data = null;
      state.isAuthenticated = false;
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
export const { login, register, logout } = authSlice.actions;

/**
 * Reducer for the auth slice.
 * @constant {import('@reduxjs/toolkit').Reducer}
 */
export const authReducer = authSlice.reducer;
