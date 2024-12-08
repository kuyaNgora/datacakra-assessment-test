import { request } from "../axios";
import { AxiosRequestConfig } from "axios";
import { ArticleParams, ArticlePayload, ShowParams } from "./types";

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
