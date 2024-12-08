import { request } from "../axios";
import { AxiosRequestConfig } from "axios";
import { UploadPayload } from "./types";

/**
 * Module name to namespace actions.
 * @constant {string}
 * @description Namespace to separate the "Upload" module.
 */
export const MODULE: string = "Upload";

export const $upload = async (payload: UploadPayload): Promise<any> => {
  // Create FormData for sending file
  const formData = new FormData();
  formData.append("files", payload.files); // add file to formData

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `/upload`,
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return request(options);
};
