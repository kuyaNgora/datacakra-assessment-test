import { createAction } from "@reduxjs/toolkit";
import { request } from "../axios";
import { LoginPayload, RegisterPayload, UserResponse } from "./types";
import { AxiosRequestConfig } from "axios";

/**
 * Module name to namespace actions.
 * @constant {string}
 */
export const MODULE: string = "Auth";

/**
 * Action to reset the authentication state.
 */
export const $reset = createAction(`${MODULE}/reset`);

/**
 * Action to sign out the user.
 */
export const $logout = createAction(`${MODULE}/signout`);

/**
 *
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
