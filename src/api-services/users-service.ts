import axios from "axios";
import { AuthData } from "../interfaces/index";
import { UpdateUserData } from "../interfaces/index";

export const registerUser = async (data: AuthData) => {
  const response = await axios.post("/api/users/register", data);
  return response.data;
};

export const loginUser = async (data: AuthData) => {
  const response = await axios.post("/api/users/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get("/api/users/current-user");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get("/api/users/get-all-users");
  return response.data;
};

export const updateUserData = async (data: UpdateUserData) => {
  const response = await axios.put("/api/users/update-users", data);
  return response.data;
};
