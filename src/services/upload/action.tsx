/**
 * Upload Module Actions
 * ======================
 * Provides an API abstraction for file upload operations using Axios.
 */

import { request } from "../axios";
import { AxiosRequestConfig } from "axios";
import { UploadPayload } from "./types";

/**
 * Module name to namespace actions.
 * @constant {string}
 * @description Namespace to separate the "Upload" module.
 */
export const MODULE: string = "Upload";

/**
 * Upload a file to the server.
 *
 * This function handles file uploads using Axios. It utilizes `FormData` for
 * sending files and ensures that the `Content-Type` is correctly set to `multipart/form-data`.
 *
 * @async
 * @function $upload
 * @param {UploadPayload} payload - The payload containing the file(s) to upload.
 * @returns {Promise<any>} A promise that resolves with the server's response.
 * @throws {Error} Throws an error if the upload fails.
 */
export const $upload = async (payload: UploadPayload): Promise<any> => {
  // Create FormData for sending file(s)
  const formData = new FormData();
  formData.append("files", payload.files); // Add files to FormData

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `/upload`,
    data: formData, // Pass FormData
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return request(options);
};
