/**
 * Axios Client Wrapper with Authentication Support
 * ================================
 * This module sets up a reusable Axios client configured with optional authentication, handling
 * successful and error responses, and managing the `Authorization` header based on the current user's JWT token.
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { store } from "./store";

const API_URL: string = process.env.REACT_APP_API_URL || "";

// Create an Axios instance with predefined configurations
const client = axios.create({
  baseURL: API_URL,
});

/**
 * Sends an HTTP request using the configured Axios client.
 *
 * This function will attach an `Authorization` header with the JWT token from the Redux store if available.
 * If no token is found, the request will be sent without the authorization header.
 *
 * @param {AxiosRequestConfig} options - The configuration options for the HTTP request.
 * @returns {Promise<any>} A promise that resolves with the response data or rejects with the error.
 *
 * @example
 * // Send a GET request to fetch some data
 * request({
 *   method: 'GET',
 *   url: '/data',
 * }).then(response => {
 *   console.log('Data fetched:', response);
 * }).catch(error => {
 *   console.error('Request failed:', error);
 * });
 */
export const request = async (options: AxiosRequestConfig): Promise<any> => {
  let token: string = "";

  // Get the state from the Redux store
  const state = store.getState();
  const userState = state?.Auth?.data;

  // Check if user is authenticated and extract JWT token
  if (userState) {
    const { jwt } = userState;
    token = jwt;
  }

  // Set or clear the Authorization header based on token availability
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }

  /**
   * Handles a successful response.
   * @param {AxiosResponse} response - The HTTP response object.
   * @returns {any} The data extracted from the response.
   */
  const onSuccess = (response: AxiosResponse): any => {
    return response.data;
  };

  /**
   * Handles an error response.
   * @param {AxiosError} error - The HTTP error object.
   * @returns {Promise<any>} A rejected promise with the error details.
   */
  const onError = (error: AxiosError): Promise<any> => {
    return Promise.reject(error.response?.data || error.message);
  };

  // Send the HTTP request and handle response or error
  return client(options).then(onSuccess).catch(onError);
};
