export type ArticleParams = {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  populate?:
    | string
    | {
        comments?: {
          populate?: {
            user?: string;
          };
        };
        user?: string;
        category?: string;
      };
  filters?: {
    title?: {
      $eqi?: string;
    };
    category?: {
      name?: {
        $eqi?: string;
      };
    };
  };
};

export type ArticlePayload = {
  title?: string;
  description?: string;
  cover_image_url?: string;
  category?: number;
};

export type ShowParams = {
  populate?: string;
};
