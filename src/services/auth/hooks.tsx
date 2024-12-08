import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import * as Service from "./action";
import { login, register } from "./slice";
import { LoginPayload, RegisterPayload } from "./types";

const useAuth = () => {
  const dispatch = useDispatch();

  const signin = useMutation({
    mutationFn: (data: LoginPayload) => Service.$login(data),
    onSuccess: (data) => {
      dispatch(login(data));
    },
    onError: (error: any) => {},
  });

  const signup = useMutation({
    mutationFn: (data: RegisterPayload) => Service.$register(data),
    onSuccess: (data) => {
      dispatch(register(data));
    },
    onError: (error: any) => {},
  });

  return {
    signin,
    signup,
  };
};

export default useAuth;
