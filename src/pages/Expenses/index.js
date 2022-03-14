import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getPathName } from "util";
import { getExpensesByTripId } from "api/expenses";
import { getExpenses } from "../../api/expenses";

import useQuery from "../../hooks/useQuery";

export default () => {
  const query = useQuery();
  const {
    data: expenses,
    loading,
    error,
  } = query.get("tripId")
    ? getExpensesByTripId({ tripId: query.get("tripId") })
    : getExpenses();

  if (loading) return "Loading...,";

  if (!expenses?.length || error) return "Expenses not found";

  console.log(expenses, query.get("tripId"));

  return (
    <div className="d-flex flex-grow-1 position-relative">
      <div className="d-flex flex-wrap">
        {expenses.map((expense, key) => (
          <Link
            key={key}
            className="w-50 p-3 td-none d-flex justify-content-center"
            to={"/expenses/" + expense.id}
          >
            {JSON.stringify(expense, null, 2)}
          </Link>
        ))}
      </div>
      <Link
        to={"/expenses/add"}
        className="flex-center position-absolute z-index-2 rounded-circle bg-primary text-white p-3 td-none m-3"
        style={{ right: 0, bottom: 0 }}
      >
        +
      </Link>
    </div>
  );
};
