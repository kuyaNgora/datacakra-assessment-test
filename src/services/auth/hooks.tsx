/**
 * useAuth Hook
 * ============
 * A custom hook to handle authentication using React Query and Redux.
 *
 * This hook provides methods for signing in and signing up users, with state management
 * handled by React Query mutations and Redux actions.
 */

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import * as Service from "./action";
import { login, register } from "./slice";
import { LoginPayload, RegisterPayload } from "./types";

/**
 * Custom React hook for managing user authentication.
 *
 * @function useAuth
 * @returns {Object} An object containing authentication methods:
 * - `signin`: A mutation object for logging in users.
 * - `signup`: A mutation object for registering new users.
 */
const useAuth = () => {
  const dispatch = useDispatch();

  /**
   * Sign in a user with their credentials.
   *
   * @mutation signin
   * @param {LoginPayload} data - The login payload containing email/username and password.
   * @onSuccess Dispatches the `login` Redux action with the user data upon successful login.
   * @onError Handles any errors that occur during the login process.
   */
  const signin = useMutation({
    mutationFn: (data: LoginPayload) => Service.$login(data),
    onSuccess: (data) => {
      dispatch(login(data));
    },
    onError: (error: any) => {},
  });

  /**
   * Sign up a new user with their details.
   *
   * @mutation signup
   * @param {RegisterPayload} data - The registration payload containing username, email, and password.
   * @onSuccess Dispatches the `register` Redux action with the user data upon successful registration.
   * @onError Handles any errors that occur during the registration process.
   */
  const signup = useMutation({
    mutationFn: (data: RegisterPayload) => Service.$register(data),
    onSuccess: (data) => {
      dispatch(register(data));
    },
    onError: (error: any) => {},
  });

  return {
    signin,
    signup,
  };
};

export default useAuth;
