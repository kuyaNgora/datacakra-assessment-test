import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { $create, $delete, $get, $update } from "./actions";

const useCategory = () => {
  const queryClient = useQueryClient();

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => $get(),
    placeholderData: keepPreviousData,
  });

  const createCategory = useMutation({
    mutationFn: $create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const removeCategory = useMutation({
    mutationFn: (id: string) => $delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Record<string, any>;
    }) => $update(id, payload),
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
