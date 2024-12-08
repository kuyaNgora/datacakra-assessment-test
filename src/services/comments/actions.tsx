import { request } from "../axios";
import { AxiosRequestConfig } from "axios";
import { CreatePayload, GetParams, UpdatePayload } from "./types";

/**
 * Module name to namespace actions.
 * @constant {string}
 * @description Namespace to separate the "Comments" module.
 */
export const MODULE: string = "Comments";

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
