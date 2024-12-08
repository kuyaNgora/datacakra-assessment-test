/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import useArticles from "../../../../services/articles/hooks";
import { $get } from "../../../../services/articles/slice";

interface CardsProps {
  category?: string;
}

const Cards: React.FC<CardsProps> = ({ category }) => {
  const dispatch = useDispatch();

  const { articles } = useArticles(
    1,
    10,
    {
      populate: {
        comments: {
          populate: {
            user: "*",
          },
        },
      },
      filters: {
        category: {
          name: {
            $eqi: category,
          },
        },
      },
    },
    !!category
  );

  useEffect(() => {
    if (articles.isSuccess) {
      dispatch($get({ name: category || "", data: articles?.data }));
    }
  }, [articles.isSuccess]);

  const totalComments = articles?.data?.data?.reduce(
    (count: number, article: Record<string, any>) =>
      count + article.comments.length,
    0
  );

  if (articles?.isPending) {
    return (
      <div className=" h-32 w-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg" />
    );
  }

  return (
    <div>
      <div className="border rounded p-4">
        <p className="text-xs font-light uppercase mb-2 text-gray-500">
          category:{" "}
          <span className="text-base-300 font-semibold">{category}</span>
        </p>
        <p className="text-2xl font-bold text-base-300">
          {articles?.data?.meta?.pagination?.total}{" "}
          <span className="text-xs font-light text-gray-500">article</span>
        </p>

        <p className="text-2xl font-bold text-base-300">
          {totalComments}{" "}
          <span className="text-xs font-light text-gray-500">
            total comment
          </span>
        </p>
      </div>
    </div>
  );
};

export default Cards;
