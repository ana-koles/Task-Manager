import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "7acd530f-0027-4872-b2c8-c8ac89cfd8da",
  },
});
