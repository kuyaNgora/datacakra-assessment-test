import React from "react";
import { useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";

import useCategory from "../../../services/category/hooks";
import useArticles from "../../../services/articles/hooks";
import useComments from "../../../services/comments/hooks";
import { RootState } from "../../../services/store";

import Cards from "./components/card";
import Documents from "./components/pdf";

const DashboarScreen: React.FC = () => {
  const articleStatistic = useSelector(
    (state: RootState) => state?.Article?.data
  );
  const { categories } = useCategory();
  const { articles } = useArticles(1, 10, {}, true);
  const { comments } = useComments(1, 10, {}, true);

  return (
    <div className="container flex justify-center">
      <div className="md:w-2/3 w-full border-l border-r bg-white p-6 min-h-[calc(100vh-75px)]">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-base-300 underline decoration-orange-400 underline-offset-8 decoration-4">
            Dashboard
          </p>

          <PDFDownloadLink
            document={
              <Documents
                categories={categories}
                comments={comments}
                articles={articles}
                articleStatistic={articleStatistic}
              />
            }
            fileName="dashboard.pdf"
            className="btn btn-sm btn-outline btn-info"
          >
            export
          </PDFDownloadLink>
        </div>

        <div className="divider" />

        <div className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.isLoading ? (
              <div className=" h-32 w-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg" />
            ) : (
              <div className="border rounded p-4 w-full mb-3 md:mb-0">
                <p className="text-xs uppercase mb-2 text-gray-500">
                  total categories
                </p>
                <p className="text-2xl font-bold text-base-300 ">
                  {categories?.data?.meta?.pagination?.total}
                </p>
              </div>
            )}

            {articles.isPending ? (
              <div className="h-32 w-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg" />
            ) : (
              <div className="border rounded p-4 w-full mb-3 md:mb-0">
                <p className="text-xs uppercase mb-2 text-gray-500">
                  total articles
                </p>
                <p className="text-2xl font-bold text-base-300">
                  {articles?.data?.meta?.pagination?.total}
                </p>
              </div>
            )}

            {comments.isPending ? (
              <div className="h-32 w-full animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg" />
            ) : (
              <div className="border rounded p-4 w-full mb-3 md:mb-0">
                <p className="text-xs uppercase mb-2 text-gray-500">
                  total comments
                </p>
                <p className="text-2xl font-bold text-base-300">
                  {comments?.data?.meta?.pagination?.total}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="divider" />

        <div>
          <div>
            <p className="text-xl font-semibold text-base-300 underline decoration-orange-400 underline-offset-8 decoration-4">
              Statistic Articles
            </p>
          </div>

          <div className="divider" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories?.data?.data?.map((data: any, i: number) => (
              <Cards key={i} category={data?.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboarScreen;
