/**
 * Custom React Hook for Managing Comments
 * ========================================
 * This hook provides methods for fetching and creating comments using React Query.
 * It manages data caching, fetching, and mutation logic for comments.
 */

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { GetParams } from "./types";
import { $create, $get } from "./actions";

/**
 * Custom hook to handle comment-related operations.
 *
 * @function useComments
 * @param {number} [page] - The current page number for pagination.
 * @param {number} [pageSize] - The number of comments per page for pagination.
 * @param {Omit<GetParams, "pagination">} [additionalParams] - Additional query parameters excluding pagination.
 * @param {boolean} [enable] - Flag to enable or disable fetching comments.
 * @returns {Object} The comments query result and mutation for creating comments.
 * @property {UseQueryResult} comments - The React Query object for fetching comments.
 * @property {UseMutationResult} createComment - The React Query mutation object for creating a new comment.
 */
const useComments = (
  page?: number,
  pageSize?: number,
  additionalParams?: Omit<GetParams, "pagination">,
  enable?: boolean
) => {
  /**
   * Fetches comments with pagination and additional parameters.
   * Uses React Query's `useQuery` for data fetching and caching.
   */
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

  /**
   * Mutation for creating a new comment.
   * Uses React Query's `useMutation` for handling the creation process.
   */
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
