export type CreatePayload = {
  content?: string;
  article?: number;
};

export type UpdatePayload = {
  content?: string;
};

export type GetParams = {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  populate?: {
    article?: string;
    user?: string;
  };
  sort?: {
    0?: string;
  };
};
