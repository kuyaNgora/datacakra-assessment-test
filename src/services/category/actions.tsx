/**
 * Category Module
 * ===============
 * This module provides a set of API actions for managing categories, including
 * creating, retrieving, updating, and deleting categories.
 */

import { request } from "../axios";
import { AxiosRequestConfig } from "axios";
import { CreatePayload } from "./types";

/**
 * Module name for namespacing actions.
 *
 * @constant {string} MODULE
 * @description Namespace for the "Category" module.
 */
export const MODULE: string = "Category";

/**
 * Create a new category.
 *
 * @async
 * @function $create
 * @param {CreatePayload} payload - The payload containing category details.
 * @returns {Promise<any>} The API response containing the created category data.
 */
export const $create = async (payload: CreatePayload): Promise<any> => {
  const data = {
    data: payload,
  };

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `/categories`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Retrieve all categories.
 *
 * @async
 * @function $get
 * @returns {Promise<any>} The API response containing a list of categories.
 */
export const $get = async (): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `/categories`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Retrieve details of a specific category by its ID.
 *
 * @async
 * @function $show
 * @param {string} documentId - The ID of the category to retrieve.
 * @returns {Promise<any>} The API response containing the category details.
 */
export const $show = async (documentId: string): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `/categories/${documentId}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Update an existing category by its ID.
 *
 * @async
 * @function $update
 * @param {string} documentId - The ID of the category to update.
 * @param {CreatePayload} payload - The payload containing updated category details.
 * @returns {Promise<any>} The API response containing the updated category data.
 */
export const $update = async (
  documentId: string,
  payload: CreatePayload
): Promise<any> => {
  const data = {
    data: payload,
  };

  const options: AxiosRequestConfig = {
    method: "PUT",
    url: `/categories/${documentId}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Delete a category by its ID.
 *
 * @async
 * @function $delete
 * @param {string} documentId - The ID of the category to delete.
 * @returns {Promise<any>} The API response confirming the deletion.
 */
export const $delete = async (documentId: string): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    url: `/categories/${documentId}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};
