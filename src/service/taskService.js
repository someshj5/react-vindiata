import { fetchGet, fetchPost, getHeaders, baseURL } from "./serviceClient";
import axios from "axios";

export const getAllTimeEntries = async (accessToken) => {
  return await fetchGet(`${baseURL}/task-api/`, accessToken);
};

export const getAllProjects = async (accessToken) => {
  return await fetchGet(`${baseURL}/task-api/get-project-fields`, accessToken);
};

export const createTask = async (task, accessToken) => {
  return await fetchPost(`${baseURL}/task-api/`, task, getHeaders(accessToken));
};

export const getTaskById = async (id, accessToken) => {
  return await axios.get(
    `${baseURL}/task-api/task/${id}/`,
    getHeaders(accessToken)
  );
};

export const updateTask = async (task, id, accessToken) => {
  return await axios.put(
    `${baseURL}/task-api/task/${id}/`,
    task,
    getHeaders(accessToken)
  );
};

export const deleteTask = async (id, accessToken) => {
  return await axios.delete(
    `${baseURL}/task-api/task/${id}/`,
    getHeaders(accessToken)
  );
};
