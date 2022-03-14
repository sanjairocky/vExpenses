import React from "react";

import { getExpenseByExpenseIdAndTripId } from "api/expenses";

export default () => {
  const { data: expense, loading, error } = getExpenseByExpenseIdAndTripId();

  if (loading) return "Loading...,";

  if (error) return "Expenses not found";

  return (
    <div className="d-flex flex-column p-3">
      <div>Trip Id : {expense.tripId}</div>
      <div>Expense ID : {expense.id}</div>
      <div>Expense Name : {expense.name}</div>
      <div>Users : {expense.participants?.length}</div>
    </div>
  );
};
