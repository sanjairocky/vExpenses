import axios from "axios";

// LocationClient.get("").then(function (response) {
//   console.log(response.data);
//   console.log(response.status);
//   console.log(response.statusText);
//   console.log(response.headers);
//   console.log(response.config);
// });

export const ExpenseClient = axios.create({
  baseURL: `${API_URL}/api/v1/expenses/`,
  timeout: 2 * 1000,
  headers: { "X-Sanazu-Client": "vExpenses" },
});
