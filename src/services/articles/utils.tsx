import { ArticleParams } from "./types";

export const toQueryString = (params: ArticleParams): string => {
  const buildQuery = (obj: Record<string, any>, prefix = ""): string => {
    return Object.entries(obj)
      .flatMap(([key, value]) => {
        if (value === undefined || value === null) {
          return [];
        }

        const prefixedKey = prefix ? `${prefix}[${key}]` : key;

        if (typeof value === "object" && !Array.isArray(value)) {
          return buildQuery(value, prefixedKey);
        }

        return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(
          value
        )}`;
      })
      .join("&");
  };

  return buildQuery(params);
};
