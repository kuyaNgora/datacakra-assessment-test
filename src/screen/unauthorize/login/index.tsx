import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../services/auth/hooks";

const LoginScreen: React.FC = () => {
  const Navigate = useNavigate();

  const { signin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await signin.mutate(data);
    } catch {}
  };

  return (
    <div>
      <form
        className="space-y-3 rounded p-5 border-b w-full min-w-[300px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            className={`input input-bordered flex items-center gap-2 bg-slate-100 ${
              signin.isError || errors?.identifier ? "input-error" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              {...register("identifier", {
                required: "identifier must be filled in",
              })}
              id="identifier"
              type="text"
              className="grow"
              placeholder="Username/Email"
            />
          </label>

          {errors?.identifier && (
            <div className="label">
              <span className="label-text-alt text-red-500">
                {typeof errors.identifier.message === "string"
                  ? errors.identifier.message
                  : "An error occurred"}
              </span>
            </div>
          )}
        </div>

        <div>
          <label
            className={`input input-bordered flex items-center gap-2 bg-slate-100 ${
              signin.isError || errors?.password ? "input-error" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              {...register("password", {
                required: "password must be filled in",
              })}
              id="password"
              type="password"
              className="grow"
              placeholder="Password"
            />
          </label>

          {errors?.password && (
            <div className="label">
              <span className="label-text-alt text-red-500">
                {typeof errors.password.message === "string"
                  ? errors.password.message
                  : "An error occurred"}
              </span>
            </div>
          )}

          {signin.isError && (
            <div className="label">
              <span className="label-text-alt text-red-500">
                {signin.error?.error?.message}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center !mt-5">
          <button
            type="submit"
            className={`btn btn-primary btn-block ${
              signin.isPending && "btn-disabled !text-primary"
            }`}
            disabled={signin.isPending}
          >
            {signin.isPending ? (
              <>
                <span className="loading loading-spinner text-primary"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>

      <div className="flex justify-center items-center mt-3">
        <div>
          <p className="text-xs">
            Don't have an account ?{" "}
            <span
              className="font-semibold text-primary hover:cursor-pointer hover:underline "
              onClick={() => Navigate("/register")}
            >
              Create an Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
