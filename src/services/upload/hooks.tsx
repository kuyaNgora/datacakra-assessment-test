/**
 * Custom React Hook for File Upload
 * ================================
 * This hook provides a convenient way to handle file upload operations using React Query's `useMutation`.
 * It simplifies the mutation process for uploading files and provides options for handling success and errors.
 */

import { useMutation } from "@tanstack/react-query";
import { $upload } from "./action";
import { UploadPayload } from "./types";

/**
 * Custom hook for handling file uploads.
 *
 * This hook uses React Query's `useMutation` to manage the upload process. It allows users to upload files
 * and handle the response or errors after the upload.
 *
 * @function useUpload
 * @returns {Object} The mutation result for uploading files.
 * @property {UseMutationResult} upload - React Query's mutation object for uploading files.
 */
const useUpload = () => {
  return useMutation({
    mutationFn: (payload: UploadPayload) => $upload(payload),
    onSuccess: (data) => {
      return data;
    },
    onError: (error: any) => {
      console.error("Error uploading file:", error);
    },
  });
};

export default useUpload;
