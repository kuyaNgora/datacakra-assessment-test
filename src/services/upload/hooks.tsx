import { useMutation } from "@tanstack/react-query";
import { $upload } from "./action";
import { UploadPayload } from "./types";

const useUpload = () => {
  return useMutation({
    mutationFn: (payload: UploadPayload) => $upload(payload),
    onSuccess: (data) => {
      return data;
    },
    onError: (error: any) => {},
  });
};

export default useUpload;
