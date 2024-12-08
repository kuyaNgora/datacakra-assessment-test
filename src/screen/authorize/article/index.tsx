/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CSVLink } from "react-csv";

import useArticles from "../../../services/articles/hooks";
import useCategories from "../../../services/category/hooks";

import Modal from "./components/modal";
import ArticleCard from "./components/card";
import Form from "./components/create-form";
import Detail from "./components/details";

const ArticleScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState(false);
  const [createDialog, setCreate] = useState(false);
  const [selectedArticle, setSelected] = useState<Record<string, any>>({});

  const [search, setSearch] = useState<string>();
  const [cat, setCat] = useState<string>();

  const filters: Record<string, any> = {};

  if (cat) {
    filters.category = {
      name: {
        $eqi: cat,
      },
    };
  }

  if (search) {
    filters.title = {
      $eqi: search,
    };
  }

  const { articles, createArticle } = useArticles(
    page,
    6,
    {
      populate: "*",
      filters,
    },
    true
  );

  const { categories } = useCategories();

  useEffect(() => {
    if (createArticle.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["articles", page, 6, { populate: "*" }],
      });
      setSelected({});
      setCreate(false);
    }
  }, [createArticle.isSuccess]);

  const onSubmitArticle = async (data: Record<string, any>) =>
    await createArticle.mutate(data);

  const handlePagination = (direction: "next" | "prev") => {
    setPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center px-4 py-2 ">
        <p className="text-xl font-semibold text-base-300">Articles</p>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm btn-outline btn-info"
            onClick={() => setCreate(true)}
          >
            Create New
          </button>
          {articles?.data?.meta?.pagination?.total > 0 && (
            <div>
              <CSVLink
                data={articles?.data?.data}
                filename="articles.csv"
                className="btn btn-outline btn-primary btn-sm"
              >
                Export CSV
              </CSVLink>
            </div>
          )}
        </div>
      </div>

      <div className="divider" />

      <div className="flex gap-4 flex-col md:flex-row">
        <div>
          <label className="input input-bordered flex items-center gap-2 bg-gray-200">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => setSearch(e?.target?.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div>
          <select
            className="select select-bordered w-full max-w-md bg-gray-200"
            onChange={(e) => setCat(e?.target?.value)}
          >
            <option selected value={""}>
              All Categories
            </option>
            {categories?.data?.data?.map((category: any, i: number) => (
              <option key={i} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="divider" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {articles?.data?.data?.map((data: any, i: number) => (
          <ArticleCard
            key={i}
            data={data}
            onReadMore={() => {
              setSelected(data);
              setDialog(true);
            }}
          />
        ))}
      </div>
      {articles?.data?.meta?.pagination?.total === 0 && (
        <div className="divider divider-error">DATA NOT FOUND</div>
      )}

      {articles?.isPending && (
        <div className="flex justify-center">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-xs"></span>
        </div>
      )}

      <div className="py-5 flex justify-end">
        <div className="join">
          <button
            onClick={() => handlePagination("prev")}
            className="join-item btn btn-md"
            disabled={page === 1}
          >
            «
          </button>
          <div className="join-item btn btn-md text-sm">Page {page}</div>
          <button
            onClick={() => handlePagination("next")}
            disabled={
              articles?.data?.meta?.pagination?.total === 0 ||
              articles?.data?.meta?.pagination?.pageCount === page
            }
            className="join-item btn btn-md"
          >
            »
          </button>
        </div>
      </div>

      {/* Modal for Viewing Article */}
      <Modal
        id="show_modal"
        fullscreen
        isOpen={dialog}
        onBackdropClick={() => setDialog(false)}
      >
        <Detail
          id={selectedArticle?.documentId}
          page={page}
          onClose={() => setDialog(false)}
        />
      </Modal>

      {/* Modal for Creating Article */}
      <Modal
        id="show_create"
        isOpen={createDialog}
        onBackdropClick={() => setCreate(false)}
      >
        <Form
          onSubmit={onSubmitArticle}
          onLoading={createArticle.isPending}
          onSuccess={createArticle.isSuccess}
        />
      </Modal>
    </div>
  );
};

export default ArticleScreen;
