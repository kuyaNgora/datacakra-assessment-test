/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";

import useCategory from "../../../services/category/hooks";

import Modal from "../article/components/modal";
import Form from "./components/form";

const SuperScreen: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, any>>({});
  const [create, setCreate] = useState(false);
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  const queryClient = useQueryClient();
  const { categories, createCategory, updateCategory, removeCategory } =
    useCategory();

  const formatDate = (date: string) => moment(date).format("DD/MM/YYYY HH:mm");

  useEffect(() => {
    if (createCategory.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      setCreate(false);
    }
  }, [createCategory.isSuccess]);

  useEffect(() => {
    if (updateCategory.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      setSelected({});
      setUpdate(false);
    }
  }, [updateCategory.isSuccess]);

  useEffect(() => {
    if (removeCategory.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      setSelected({});
      setRemove(false);
    }
  }, [removeCategory.isSuccess]);

  const onSubmit = async (data: Record<string, any>) =>
    await createCategory.mutate(data);

  const onUpdate = async (payload: Record<string, any>) =>
    await updateCategory.mutate({ id: selected?.documentId, payload });

  const onRemove = async (id: string) => await removeCategory.mutate(id);

  return (
    <div className="container flex justify-center">
      <div className="md:w-2/3 w-full border-l border-r bg-white p-6 min-h-[calc(100vh-75px)]">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-base-300 underline decoration-orange-400 underline-offset-8 decoration-4">
            Categories
          </p>

          <button
            className="btn btn-sm btn-outline btn-info"
            onClick={() => setCreate(true)}
          >
            Create New
          </button>
        </div>

        <div className="divider" />

        <div className="overflow-x-auto mt-4">
          <table className="table table-sm">
            {/* head */}
            <thead>
              <tr>
                <th className="text-gray-500 font-semibold uppercase text-xs">
                  No
                </th>
                <th className="text-gray-500 font-semibold uppercase text-xs">
                  Category Name
                </th>
                <th className="text-gray-500 font-semibold uppercase text-xs">
                  Created At
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories?.data?.data?.map((data: any, i: number) => (
                <tr className="hover cursor-pointer  hover:!bg-slate-300 !text-xs text-base-300">
                  <th className="!font-light">{i + 1}</th>
                  <td>{data?.name}</td>
                  <td>{formatDate(data?.createdAt)}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-square btn-outline btn-xs btn-primary me-2"
                      onClick={() => {
                        setSelected(data);
                        setUpdate(true);
                      }}
                    >
                      <svg
                        className="h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn btn-square btn-outline btn-xs btn-error"
                      onClick={() => {
                        setSelected(data);
                        setRemove(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          id="create"
          isOpen={create}
          onBackdropClick={() => setCreate(false)}
        >
          <Form
            onSubmit={onSubmit}
            onLoading={createCategory.isPending}
            onSuccess={createCategory.isSuccess}
          />
        </Modal>

        <Modal
          id="update"
          isOpen={update}
          onBackdropClick={() => setUpdate(false)}
        >
          <Form
            onSubmit={onUpdate}
            onLoading={updateCategory.isPending}
            onSuccess={updateCategory.isSuccess}
            initialData={selected}
          />
        </Modal>

        <Modal
          id="delete"
          isOpen={remove}
          onBackdropClick={() => setRemove(false)}
        >
          <div className="p-6 !text-white">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <p className="py-4">Deleted item cannot be recovered.</p>
            <div className="modal-action">
              <button
                type="button"
                disabled={removeCategory.isPending}
                className="btn btn-error btn-sm"
                onClick={() => onRemove(selected?.documentId)}
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
    </div>
  );
};

export default SuperScreen;
