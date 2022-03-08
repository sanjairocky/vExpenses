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
  const hideHeader =
    new URLSearchParams(window.location.search).get("header") === "false";
  return (
    <>
      {hideHeader || (
        <header className="p-2 bg-primary text-white shadow d-flex justify-content-center">
          <h5> Trip Expense Tracker</h5>
        </header>
      )}
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
    </>
  );
};
