/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useUpload from "../../../../services/upload/hooks";
import useCategory from "../../../../services/category/hooks";

interface FormProps {
  onSubmit: SubmitHandler<FieldValues>;
  onSuccess?: boolean;
  onLoading?: boolean;
  initialData?: Record<string, any>;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  onSuccess,
  onLoading,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { mutate: upload, data, isSuccess, isPending } = useUpload();
  const { categories } = useCategory();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      try {
        const payload = { files: selectedFile };
        await upload(payload);
      } catch {}
    }
  };

  useEffect(() => {
    if (!isSuccess) return;

    setValue("cover_image_url", data[0]?.url);
  }, [isSuccess]);

  useEffect(() => {
    if (!onSuccess) return;
    reset();
  }, [onSuccess]);

  useEffect(() => {
    if (initialData) {
      // Set initial values
      setValue("title", initialData?.title || "");
      setValue("description", initialData?.description || "");
      setValue("cover_image_url", initialData?.cover_image_url || "");
      setValue("category", initialData?.category?.id || null);
    }
  }, [initialData]);

  return (
    <div className="h-full p-6">
      <form
        method="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            {...register("title")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full text-sm"
          />
          {/* <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div> */}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            {...register("description")}
            placeholder="Type here"
            className="textarea textarea-bordered w-full "
          ></textarea>
          {/* <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div> */}
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <select
            {...register("category", { valueAsNumber: true })}
            className="select select-bordered"
          >
            <option disabled selected>
              Pick one
            </option>
            {categories?.data?.data?.map((category: any, i: number) => (
              <option key={i} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Cover</span>
          </div>
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/webp"
            className="file-input file-input-bordered w-full file-input-sm"
          />

          {isPending && (
            <div className="label">
              <span className="label-text-alt flex items-center gap-2">
                Uploading{" "}
                <span className="loading loading-dots loading-xs"></span>
              </span>
            </div>
          )}
        </label>

        <div className="modal-action">
          {/* if there is a button, it will close the modal */}
          <button
            type="submit"
            disabled={isPending || onLoading}
            className="btn btn-primary btn-sm"
          >
            Save
          </button>
          <form method="dialog">
            <button className="btn btn-neutral btn-sm">Close</button>
          </form>
        </div>
      </form>
    </div>
  );
};

export default Form;
