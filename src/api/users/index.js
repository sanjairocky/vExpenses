import { UserClient } from "../shared";
import { useAxios } from "../shared/useAxios";

export const getUsers = (props = {}) =>
  useAxios({ ...props, axios: UserClient, method: "get" });

export const createUser = (props = {}) =>
  useAxios({
    ...props,
    axios: UserClient,
    method: "post",
  });

export const getUserByEmail = (props = {}) =>
  useAxios({
    ...props,
    axios: UserClient,
    method: "get",
  });
