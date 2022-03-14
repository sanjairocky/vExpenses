import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import {
  Trips,
  Trip,
  Expense,
  Expenses,
  CreateTrip,
  CreateExpense,
  Home,
  Users,
  ViewTrip,
  CreateUser,
} from "pages";

export default () => {
  const hideHeader =
    new URLSearchParams(window.location.search).get("header") === "false";

  const AddUser = () => {
    const { userId } = useParams();
    return userId;
  };
  return (
    <>
      {hideHeader || (
        <header className="p-2 bg-primary text-white shadow d-flex justify-content-center">
          <h5> Trip Expense Tracker</h5>
        </header>
      )}
      <Routes>
        <Route path="/">
          <Route element={<Home />} index />
          <Route path="users">
            <Route element={<Users />} index />
            <Route path=":userId" element={<AddUser />} />
            <Route path="add" element={<CreateUser />} />
          </Route>
          {/* <Route path="expenses">
            <Route element={<Expenses />} index />
            <Route path="add" element={<CreateExpense />} />
            <Route path=":expenseId" element={<Expense />} />
          </Route> */}
          <Route path="trips">
            <Route index element={<Trips />} />
            <Route path="add" element={<CreateTrip />} />
            <Route path=":tripId" element={<ViewTrip />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
