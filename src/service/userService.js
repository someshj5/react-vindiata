import { fetchGet, fetchPost, baseURL } from "./serviceClient";

export const getAllUsers = async () => {
  return await fetchGet(`https://fakestoreapi.com/users?limit=5`);
};

export const registerUser = async (user) => {
  return await fetchPost(`${baseURL}/user/register`, {
    first_name:user.first_name,
    last_name:user.last_name,
    email: user.email,
    username: user.username,
    password: user.password,
  });
};

export const loginUser = async (user) => {
  return await fetchPost(`${baseURL}/user/login`, {
    username: user.username,
    password: user.password,
  });
};
