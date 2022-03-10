import axios from "axios";

// LocationClient.get("").then(function (response) {
//   console.log(response.data);
//   console.log(response.status);
//   console.log(response.statusText);
//   console.log(response.headers);
//   console.log(response.config);
// });

const baseProps = {
  timeout: 2 * 1000,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "X-Sanazu-Client": "vExpenses",
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
