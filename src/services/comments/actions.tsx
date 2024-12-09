/**
 * Comments Module API Actions
 * ============================
 * This module provides API actions for managing comments. These actions handle
 * creating, retrieving, updating, and deleting comments by interacting with the backend.
 */

import { request } from "../axios";
import { AxiosRequestConfig } from "axios";
import { CreatePayload, GetParams, UpdatePayload } from "./types";

/**
 * Module name to namespace actions.
 * @constant {string}
 * @description Namespace to separate the "Comments" module.
 */
export const MODULE: string = "Comments";

/**
 * Create a new comment.
 *
 * @async
 * @function $create
 * @param {CreatePayload} payload - The payload for creating a new comment.
 * @returns {Promise<any>} The API response after creating the comment.
 */
export const $create = async (payload: CreatePayload): Promise<any> => {
  const data = {
    data: payload,
  };

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `/comments`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Retrieve a list of comments.
 *
 * @async
 * @function $get
 * @param {GetParams} params - Query parameters for fetching comments.
 * @returns {Promise<any>} The API response containing the list of comments.
 */
export const $get = async (params: GetParams): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `/comments`,
    params,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Retrieve a specific comment by ID.
 *
 * @async
 * @function $show
 * @param {string} documentId - The ID of the comment to retrieve.
 * @returns {Promise<any>} The API response containing the comment data.
 */
export const $show = async (documentId: string): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `/comments/${documentId}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Update a specific comment by ID.
 *
 * @async
 * @function $update
 * @param {string} documentId - The ID of the comment to update.
 * @param {UpdatePayload} payload - The payload containing updated comment data.
 * @returns {Promise<any>} The API response after updating the comment.
 */
export const $update = async (
  documentId: string,
  payload: UpdatePayload
): Promise<any> => {
  const data = {
    data: payload,
  };
  const options: AxiosRequestConfig = {
    method: "PUT",
    url: `/comments/${documentId}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Delete a specific comment by ID.
 *
 * @async
 * @function $delete
 * @param {string} documentId - The ID of the comment to delete.
 * @returns {Promise<any>} The API response after deleting the comment.
 */
export const $delete = async (documentId: string): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    url: `/comments/${documentId}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};
