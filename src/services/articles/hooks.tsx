import { $create, $delete, $get, $show, $update } from "./action";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ArticleParams, ShowParams } from "./types";

const useArticles = (
  page?: number,
  pageSize?: number,
  additionalParams?: Omit<ArticleParams, "pagination">,
  enabled?: boolean
) => {
  const queryClient = useQueryClient();

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

  const useShow = (documentId: string, params: ShowParams) => {
    return useQuery({
      queryKey: ["show", documentId, params],
      queryFn: () => $show(documentId, params),
      enabled: !!documentId,
    });
  };

  const createArticle = useMutation({
    mutationFn: $create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles", { page, pageSize, additionalParams }],
      });
    },
  });

  const removeArticle = useMutation({
    mutationFn: (id: string) => $delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles", { page, pageSize, additionalParams }],
      });
    },
  });

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
