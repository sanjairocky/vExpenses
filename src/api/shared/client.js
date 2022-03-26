import axios from "axios";

const baseProps = {
  timeout: 2 * 1000,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "X-Sanazu-Client": "vExpenses",
    "X-USER": new URLSearchParams(window.location.search).get("user"),
  },
};

export const ExpenseClient = axios.create({
  baseURL: `${API_URL}/api/v1/expenses/`,
  ...baseProps,
});

export const TripClient = axios.create({
  baseURL: `${API_URL}/api/v1/trips/`,
  ...baseProps,
});

export const UserClient = axios.create({
  baseURL: `${API_URL}/api/v1/users/`,
  ...baseProps,
});
