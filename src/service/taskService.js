import { fetchGet, baseURL } from "./serviceClient";
import axios from "axios";

const getHeader = (token) => {
  return {
    Authorization: token,
  };
};

export const getAllTimeEntries = async (accessToken) => {
  return await fetchGet(`${baseURL}/task-api/`, accessToken);
};

export const getAllProjects = async (accessToken) => {
  return await fetchGet(`${baseURL}/task-api/get-project-fields`, accessToken);
};

export const createTask = async (task, accessToken) => {
  return await axios.post(`${baseURL}/task-api/`, task, {
    headers: getHeader(accessToken),
  });
};

export const getTaskById = async (id, accessToken) => {
  return await axios.get(`${baseURL}/task-api/task/${id}/`, {
    headers: { Authorization: accessToken },
  });
};

export const updateTask = async (task, id, accessToken) => {
  return await axios.put(
    `${baseURL}/task-api/task/${id}/`,
    task,
    getHeader(accessToken)
  );
};

export const deleteTask = async (id, accessToken) => {
  return await axios.delete(
    `${baseURL}/task-api/task/${id}/`,
    getHeader(accessToken)
  );
};
