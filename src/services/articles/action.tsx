/**
 * Article API Utilities
 * =====================
 * A collection of utility functions for interacting with the `Article` API resource.
 *
 * This module includes methods to perform CRUD (Create, Read, Update, Delete) operations
 * for `Article` entities. Each function uses Axios for HTTP requests and adheres to a
 * consistent structure for error handling and data handling.
 */

import { AxiosRequestConfig } from "axios";
import { ArticleParams, ArticlePayload, ShowParams } from "./types";
import { request } from "../axios";

/**
 * Module name to namespace actions.
 * @constant {string}
 * @description Namespace to separate the "Article" module.
 */
export const MODULE: string = "Article";

/**
 * Fetch articles from the API.
 *
 * @async
 * @function $get
 * @param {ArticleParams} params - Query parameters for the API request, including pagination, populate, and filters.
 * @returns {Promise<any>} The API response containing article data.
 */

export const $get = async (params: ArticleParams): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "/articles",
    params,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Fetch a single article by its document ID.
 *
 * @async
 * @function $show
 * @param {string} documentId - The ID of the article to retrieve.
 * @param {ShowParams} params - Additional query parameters for the API request.
 * @returns {Promise<any>} The API response containing the article data.
 */
export const $show = async (
  documentId: string,
  params: ShowParams
): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `/articles/${documentId}`,
    params,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Create a new article.
 *
 * @async
 * @function $create
 * @param {ArticlePayload} payload - The payload containing article data to create.
 * @returns {Promise<any>} The API response after creating the article.
 */
export const $create = async (payload: ArticlePayload): Promise<any> => {
  const data = {
    data: payload,
  };

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `/articles`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Update an existing article.
 *
 * @async
 * @function $update
 * @param {string} documentId - The ID of the article to update.
 * @param {ArticlePayload} payload - The payload containing updated article data.
 * @returns {Promise<any>} The API response after updating the article.
 */
export const $update = async (
  documentId: string,
  payload: ArticlePayload
): Promise<any> => {
  const data = {
    data: payload,
  };

  const options: AxiosRequestConfig = {
    method: "PUT",
    url: `/articles/${documentId}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};

/**
 * Delete an article by its document ID.
 *
 * @async
 * @function $delete
 * @param {string} documentId - The ID of the article to delete.
 * @returns {Promise<any>} The API response after deleting the article.
 */
export const $delete = async (documentId: string): Promise<any> => {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    url: `/articles/${documentId}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request(options);
};
