/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "./modal";
import Form from "./create-form";

import useArticles from "../../../../services/articles/hooks";
import useComments from "../../../../services/comments/hooks";
import { RootState } from "../../../../services/store";
import { CreatePayload } from "../../../../services/comments/types";

interface DetailProps {
  id: string;
  onClose?: () => void;
  page?: number;
}
const Detail: React.FC<DetailProps> = ({ id, page, onClose }) => {
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  const stateUser = useSelector((state: RootState) => state?.Auth?.data);
  const queryClient = useQueryClient();

  const { useShow, updateArticle, removeArticle } = useArticles();
  const { createComment } = useComments();
  const { data: detail, isLoading } = useShow(id, { populate: "*" });

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (createComment.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["show", id, { populate: "*" }],
      });
      reset();
    }
  }, [createComment.isSuccess]);

  useEffect(() => {
    if (removeArticle.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["articles", page, 6, { populate: "*" }],
      });
      setRemove(false);
      onClose?.();
    }
  }, [removeArticle.isSuccess]);

  useEffect(() => {
    if (updateArticle.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["show", id, { populate: "*" }],
      });

      queryClient.invalidateQueries({
        queryKey: ["articles", page, 6, { populate: "*" }],
      });

      setUpdate(false);
    }
  }, [updateArticle.isSuccess]);

  const formatDate = (date: string) => moment(date).format("DD/MM/YYYY HH:mm");

  const onSubmit = async (data: CreatePayload) => {
    const payload = { ...data, article: detail?.data?.id };
    await createComment.mutate(payload);
  };

  const onUpdateArticle = async (payload: Record<string, any>) =>
    await updateArticle.mutate({ id: detail?.data?.documentId, payload });

  const onRemove = async (id: string) => await removeArticle.mutate(id);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:w-2/3 p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-10 rounded-md">
                <span className="text-base">
                  {detail?.data?.user?.username[0]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm">{detail?.data?.user?.username}</p>
              <p className="text-xs">Author</p>
            </div>
          </div>
          {stateUser?.user?.documentId === detail?.data?.user?.documentId && (
            <div className="flex gap-2 items-center">
              <button
                className="btn btn-xs btn-outline btn-info"
                onClick={() => setUpdate(true)}
              >
                Update
              </button>
              <button
                className="btn btn-xs btn-outline btn-error"
                onClick={() => setRemove(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="py-6">
          <p className="capitalize font-semibold text-xl">
            {detail?.data?.title}
          </p>
          <span className="text-xs badge badge-primary badge-outline">
            {detail?.data?.category?.name}
          </span>

          <div className="py-3">
            <figure>
              <img
                src={detail?.data?.cover_image_url}
                alt=""
                className="max-h-80 h-full w-full object-cover object-center rounded-lg"
              />
            </figure>
          </div>

          <p className="text-sm">{detail?.data?.description}</p>
        </div>
      </div>

      <div className="md:w-1/3 md:max-h-full !ps-0 bg-base-200">
        <div className="w-full md:h-[calc(100vh-5em-120px)] md:overflow-auto p-6 pb-2 !pe-3 ">
          <div className="border-b pb-2 mb-2">
            <p className="text-sm">
              Comments ({detail?.data?.comments?.length})
            </p>
          </div>
          {detail?.data?.comments?.map(
            (comment: Record<string, any>, i: number) => (
              <div className="chat chat-end">
                <div key={i} className="chat-bubble flex items-center min-h-4">
                  <div className="text-xs">{comment?.content}</div>
                </div>
                <div className="chat-footer">
                  <time className="text-xs opacity-50">
                    {formatDate(comment?.publishedAt)}
                  </time>
                </div>
              </div>
            )
          )}
        </div>

        <div className="min-h-16 border-t w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col py-2 px-3">
              <textarea
                {...register("content", { required: "content is empty" })}
                id="content"
                placeholder="Type here..."
                className="textarea textarea-bordered textarea-xs w-full"
              ></textarea>

              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={createComment.isPending}
                  className="btn btn-primary btn-xs"
                >
                  Comment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for Update Article */}
      <Modal
        id="show_update"
        isOpen={update}
        onBackdropClick={() => setUpdate(false)}
      >
        <Form
          initialData={detail?.data}
          onSubmit={onUpdateArticle}
          onLoading={updateArticle.isPending}
          onSuccess={updateArticle.isSuccess}
        />
      </Modal>

      {/* Modal for Deleting Article */}
      <Modal
        id="show_remove"
        isOpen={remove}
        onBackdropClick={() => setRemove(false)}
      >
        <div className="p-6">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Deleted item cannot be recovered.</p>
          <div className="modal-action">
            <button
              type="button"
              disabled={removeArticle.isPending}
              className="btn btn-error btn-sm"
              onClick={() => {
                onRemove(detail?.data?.documentId);
              }}
            >
              Delete
            </button>
            <form method="dialog">
              <button
                onClick={() => setRemove(false)}
                className="btn btn-neutral btn-sm"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Detail;
