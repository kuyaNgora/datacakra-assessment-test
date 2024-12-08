import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { GetParams } from "./types";
import { $create, $get } from "./actions";

const useComments = (
  page?: number,
  pageSize?: number,
  additionalParams?: Omit<GetParams, "pagination">,
  enable?: boolean
) => {
  const comments = useQuery({
    queryKey: ["comments", page, pageSize, additionalParams],
    queryFn: () =>
      $get({
        pagination: { page, pageSize },
        ...additionalParams,
      }),
    placeholderData: keepPreviousData,
    enabled: enable || false,
  });

  const createComment = useMutation({
    mutationFn: $create,
    onSuccess: (data) => {
      return data;
    },
  });

  return {
    comments,
    createComment,
  };
};

export default useComments;
