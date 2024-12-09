/**
 * useArticles Hook
 * =================
 * A custom hook to manage article-related API interactions using React Query.
 *
 * This hook provides functionality to fetch, create, update, and delete articles,
 * as well as fetch individual article details.
 */

import { $create, $delete, $get, $show, $update } from "./action";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ArticleParams, ShowParams } from "./types";

/**
 * Custom React Query hook for managing articles.
 *
 * @function useArticles
 * @param {number} [page] - The current page number for pagination.
 * @param {number} [pageSize] - The number of articles per page for pagination.
 * @param {Omit<ArticleParams, "pagination">} [additionalParams] - Additional query parameters excluding pagination.
 * @param {boolean} [enabled] - A flag to enable or disable the query.
 * @returns {Object} An object containing methods and state for article management:
 * - `articles`: The React Query result for fetching articles.
 * - `createArticle`: Mutation function to create an article.
 * - `useShow`: A nested hook to fetch details of a specific article.
 * - `removeArticle`: Mutation function to delete an article.
 * - `updateArticle`: Mutation function to update an article.
 */
const useArticles = (
  page?: number,
  pageSize?: number,
  additionalParams?: Omit<ArticleParams, "pagination">,
  enabled?: boolean
) => {
  const queryClient = useQueryClient();

  /**
   * Fetch a list of articles with optional pagination and additional parameters.
   */
  const articles = useQuery({
    queryKey: ["articles", page, pageSize, additionalParams],
    queryFn: () =>
      $get({
        pagination: { page, pageSize },
        ...additionalParams,
      }),
    placeholderData: keepPreviousData,
    enabled: enabled || false,
  });

  /**
   * Fetch details of a specific article by its ID.
   *
   * @function useShow
   * @param {string} documentId - The ID of the article to fetch.
   * @param {ShowParams} params - Additional query parameters for the request.
   * @returns {Object} The React Query result for fetching article details.
   */
  const useShow = (documentId: string, params: ShowParams) => {
    return useQuery({
      queryKey: ["show", documentId, params],
      queryFn: () => $show(documentId, params),
      enabled: !!documentId,
    });
  };

  /**
   * Create a new article.
   *
   * @function createArticle
   * @returns {Object} The React Query mutation object for creating an article.
   */
  const createArticle = useMutation({
    mutationFn: $create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles", { page, pageSize, additionalParams }],
      });
    },
  });

  /**
   * Delete an existing article by its ID.
   *
   * @function removeArticle
   * @param {string} id - The ID of the article to delete.
   * @returns {Object} The React Query mutation object for deleting an article.
   */
  const removeArticle = useMutation({
    mutationFn: (id: string) => $delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles", { page, pageSize, additionalParams }],
      });
    },
  });

  /**
   * Update an existing article by its ID.
   *
   * @function updateArticle
   * @param {Object} params - Parameters containing the article ID and payload.
   * @param {string} params.id - The ID of the article to update.
   * @param {Record<string, any>} params.payload - The payload containing updated data.
   * @returns {Object} The React Query mutation object for updating an article.
   */
  const updateArticle = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Record<string, any>;
    }) => $update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles", { page, pageSize, additionalParams }],
      });
    },
  });

  return {
    articles,
    createArticle,
    useShow,
    removeArticle,
    updateArticle,
  };
};

export default useArticles;
