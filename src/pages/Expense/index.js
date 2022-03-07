import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "context/app";

export default () => {
  const { expenseId, tripId } = useParams();
  const [{ trips }] = useApp();

  const getExpense = () =>
    trips
      .find(({ id }) => id === tripId)
      .expenses?.find(({ id }) => id === expenseId);

  const [expense, setExpense] = useState(getExpense());

  useEffect(() => {
    setExpense(getExpense());
  }, [tripId, expenseId]);

  if (!expense) return "Expense not Found!";

  return (
    <div className="d-flex flex-column p-3">
      <div>Trip Id : {tripId}</div>
      <div>Expense ID : {expenseId}</div>
      <div>Expense Name : {expense.name}</div>
      <div>Users : {expense.users.length}</div>
    </div>
  );
};
