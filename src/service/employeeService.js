import { fetchGet, fetchPost, getHeaders, baseURL } from "./serviceClient";
import axios from "axios";

export const getAllEmployee = async (accessToken) => {
  return await fetchGet(`${baseURL}/employee-api/`, accessToken);
};

export const createEmployee = async (employee, accessToken) => {
  return await fetchPost(
    `${baseURL}/employee-api/`,
    employee,
    getHeaders(accessToken)
  );
};

export const getEmployeeById = async (id, accessToken) => {
  return await axios.get(
    `${baseURL}/employee-api/employee/${id}/`,
    getHeaders(accessToken)
  );
};

export const updateEmployee = async (employee, id, accessToken) => {
  return await axios.put(
    `${baseURL}/employee-api/employee/${id}/`,
    employee,
    getHeaders(accessToken)
  );
};

export const deleteEmployee = async (id, accessToken) => {
  return await axios.delete(
    `${baseURL}/employee-api/employee/${id}/`,
    getHeaders(accessToken)
  );
};
