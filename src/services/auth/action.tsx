/**
 * Authentication Module
 * =====================
 * This module provides utility functions and Redux actions for user authentication,
 * including login, registration, logout, and resetting the authentication state.
 */

import { createAction } from "@reduxjs/toolkit";
import { request } from "../axios";
import { LoginPayload, RegisterPayload, UserResponse } from "./types";
import { AxiosRequestConfig } from "axios";

/**
 * Module name to namespace actions.
 * @constant {string}
 * @description Namespace to separate the "Auth" module actions.
 */
export const MODULE: string = "Auth";

/**
 * Redux action to reset the authentication state.
 *
 * @action $reset
 * @description Resets the authentication-related state to its initial value.
 */
export const $reset = createAction(`${MODULE}/reset`);

/**
 * Redux action to sign out the user.
 *
 * @action $logout
 * @description Clears the authentication state and logs out the user.
 */
export const $logout = createAction(`${MODULE}/signout`);

/**
 * Authenticate a user with login credentials.
 *
 * @async
 * @function $login
 * @param {LoginPayload} payload - The login credentials including email/username and password.
 * @returns {Promise<UserResponse>} The authenticated user's data.
 */
export const $login = async (payload: LoginPayload): Promise<UserResponse> => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/local",
    data: payload,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  return request(options);
};

/**
 * Register a new user.
 *
 * @async
 * @function $register
 * @param {RegisterPayload} payload - The registration data including username, email, and password.
 * @returns {Promise<UserResponse>} The newly registered user's data.
 */
export const $register = async (
  payload: RegisterPayload
): Promise<UserResponse> => {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/local/register",
    data: payload,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  return request(options);
};
