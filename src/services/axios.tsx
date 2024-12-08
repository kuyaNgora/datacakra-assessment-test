import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { store } from "./store";

const API_URL: string = process.env.REACT_APP_API_URL || "";

// Create an Axios instance with predefined configurations
const client = axios.create({
  baseURL: API_URL,
});

/**
 * Sends an HTTP request using the client with optional authentication.
 *
 * @param options - The configuration options for the HTTP request.
 * @returns A promise that resolves with the response data or rejects with an error.
 */
export const request = async (options: AxiosRequestConfig): Promise<any> => {
  let token: string = "";

  // Get the state from the Redux store
  const state = store.getState();
  const userState = state?.Auth?.data;

  if (userState) {
    const { jwt } = userState;
    token = jwt;
  }

  // Set or clear the authorization header based on token availability
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }

  /**
   * Handles a successful response.
   * @param response - The HTTP response object.
   * @returns The extracted data from the response.
   */
  const onSuccess = (response: AxiosResponse): any => {
    return response.data;
  };

  /**
   * Handles an error response.
   * @param error - The HTTP error object.
   * @returns A rejected promise with the error details.
   */
  const onError = (error: AxiosError): Promise<any> => {
    return Promise.reject(error.response?.data || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};
