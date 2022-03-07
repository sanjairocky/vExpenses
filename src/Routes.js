import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Trips,
  Trip,
  Expense,
  Expenses,
  CreateTrip,
  CreateExpense,
} from "pages";

export default () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<Navigate to="/trips" />} index />
        <Route path="/trips">
          <Route index element={<Trips />} />
          <Route path="add" element={<CreateTrip />} />
          <Route path=":tripId" element={<Trip />}>
            <Route path="expenses">
              <Route element={<Expenses />} index />
              <Route path="add" element={<CreateExpense />} />
              <Route path=":expenseId" element={<Expense />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
