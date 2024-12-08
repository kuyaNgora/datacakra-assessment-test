/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

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

  useEffect(() => {
    if (!onSuccess) return;
    reset();
  }, [onSuccess]);

  useEffect(() => {
    if (initialData) {
      // Set initial values
      setValue("name", initialData?.name || "");
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
            <span className="label-text">Name</span>
          </div>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Type here"
            className="input input-bordered w-full text-sm text-white"
          />
          {/* <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div> */}
        </label>

        <div className="modal-action">
          {/* if there is a button, it will close the modal */}
          <button
            type="submit"
            disabled={onLoading}
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
