import React, { MouseEventHandler } from "react";

interface ArticleProps {
  data: any;
  key?: number;
  onReadMore?: MouseEventHandler<HTMLButtonElement>;
}

const ArticleCard: React.FC<ArticleProps> = ({ data, key, onReadMore }) => {
  return (
    <div key={key} className="card bg-base-300 shadow-xl">
      {data?.cover_image_url && (
        <figure className="md:h-1/2 ">
          <img
            src={data?.cover_image_url || ""}
            alt="covers"
            className="h-full w-full object-cover"
          />
        </figure>
      )}

      <div className="card-body !p-4 h-1/2">
        <div className="flex items-center space-x-4 border-b-[.5px] pb-3 ">
          <div className="flex items-center space-x-2">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-6 rounded-full">
                <span className="text-xs">{data?.user?.username[0]}</span>
              </div>
            </div>
            <p className="text-sm">{data?.user?.username}</p>
          </div>
          <div className="badge badge-primary badge-outline badge-sm">
            {data?.category?.name}
          </div>
        </div>

        <div className="flex-1 flex-col !items-start">
          <div className="flex flex-col gap-1">
            <p className="text-base capitalize font-semibold truncate overflow-hidden whitespace-nowrap">
              {data?.title}
            </p>
            <p className="text-sm truncate overflow-hidden whitespace-nowrap">
              {data?.description}
            </p>
          </div>
        </div>

        <div className="card-actions justify-end items-center">
          <div>
            <p className="text-xs">{data?.comments?.length} comments</p>
          </div>
          <button
            className="btn btn-primary btn-xs !font-medium"
            onClick={onReadMore}
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
