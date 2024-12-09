/**
 * Custom React Query Hook for Category Management
 * ===============================================
 * This hook integrates with React Query to manage category data,
 * including fetching, creating, updating, and deleting categories.
 */

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { $create, $delete, $get, $update } from "./actions";

/**
 * useCategory
 * ===========
 * A custom hook for category management using React Query.
 *
 * @returns {Object} - Methods and state for category management.
 * @property {UseQueryResult} categories - React Query state for fetching categories.
 * @property {UseMutationResult} createCategory - Mutation for creating a new category.
 * @property {UseMutationResult} removeCategory - Mutation for deleting a category.
 * @property {UseMutationResult} updateCategory - Mutation for updating a category.
 */
const useCategory = () => {
  const queryClient = useQueryClient();

  /**
   * Fetches all categories.
   * Uses React Query's `useQuery` to fetch category data from the API and cache it.
   */
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => $get(),
    placeholderData: keepPreviousData,
  });

  /**
   * Mutation to create a new category.
   * Invalidates the "categories" query cache upon success to refetch the data.
   */
  const createCategory = useMutation({
    mutationFn: $create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  /**
   * Mutation to delete a category by ID.
   * Invalidates the "categories" query cache upon success to refetch the data.
   */
  const removeCategory = useMutation({
    mutationFn: (id: string) => $delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  /**
   * Mutation to update an existing category by ID.
   * Invalidates the "categories" query cache upon success to refetch the data.
   */
  const updateCategory = useMutation({
    mutationFn: (params: { id: string; payload: Record<string, any> }) =>
      $update(params.id, params.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return {
    categories,
    createCategory,
    removeCategory,
    updateCategory,
  };
};

export default useCategory;
