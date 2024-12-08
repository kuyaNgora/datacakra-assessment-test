import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../services/store";
import useComments from "../../../services/comments/hooks";

const ProfileScreen: React.FC = () => {
  const stateUser = useSelector((state: RootState) => state.Auth?.data);
  const [page, setPage] = useState(1);

  const { comments } = useComments(
    page,
    10,
    {
      populate: {
        article: "*",
        user: "*",
      },
    },
    true
  );

  const handlePagination = (direction: "next" | "prev") => {
    setPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  return (
    <div className="container flex justify-center">
      <div className="md:w-2/3 w-full border-l border-r bg-white p-6 min-h-[calc(100vh-75px)]">
        <div className="flex gap-4 flex-col md:flex-row ">
          <div className="w-full md:w-1/2">
            <p className="text-xl font-semibold text-base-300 underline decoration-orange-400 underline-offset-8 decoration-4">
              Profile
            </p>

            <div className="my-5">
              <div className="flex gap-4">
                <div className="w-2/5 text-md font-light text-base-300">
                  username :
                </div>
                <div className="w-3/5 text-md font-semibold text-base-300">
                  {stateUser?.user?.username}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-2/5 text-md font-light text-base-300">
                  email :
                </div>
                <div className="w-3/5 text-md font-semibold text-base-300">
                  {stateUser?.user?.email}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2  bg-slate-200 p-6 rounded-xl border border-black">
            <p className="text-md font-light text-base-300 underline decoration-orange-400 underline-offset-8 decoration-4 mb-5">
              Commented Article
            </p>

            {comments?.data?.data?.map((data: any, i: number) => (
              <div key={i} className="py-2 border-b border-orange-400">
                <span className="text-xs text-base-300 italic">
                  <span className="font-semibold">{data?.user?.username} </span>
                  left a comment on the article
                  <span className="font-semibold"> {data?.article?.title}</span>
                </span>

                <div className="text-sm text-base-300 mt-2">
                  {data?.content}
                </div>
              </div>
            ))}

            <div className="py-5 flex justify-end">
              <div className="join">
                <button
                  onClick={() => handlePagination("prev")}
                  className="join-item btn btn-xs text-sm"
                  disabled={page === 1}
                >
                  «
                </button>
                <div className="join-item btn btn-xs text-xs">Page {page}</div>
                <button
                  onClick={() => handlePagination("next")}
                  disabled={
                    comments?.data?.meta?.pagination?.pageCount === page
                  }
                  className="join-item btn btn-xs text-sm"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
