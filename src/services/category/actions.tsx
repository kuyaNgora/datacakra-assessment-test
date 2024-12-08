import { request } from "../axios";
import { AxiosRequestConfig } from "axios";
import { CreatePayload } from "./types";

/**
 * Module name to namespace actions.
 * @constant {string}
 * @description Namespace to separate the "Category" module.
 */
export const MODULE: string = "Category";

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
