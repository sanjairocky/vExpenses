import React from "react";
import { Link } from "react-router-dom";
import { getExpenses } from "api/expenses";
import { getTrips } from "api/trips";
import { getUsers } from "api/users";
import { Icon, Last90DaysTrip } from "components";

export default () => {
  const { data: trips, isLoading: tripLoading, error: tripError } = getTrips();
  const { data: users, isLoading: usersLoading, error: userError } = getUsers();
  const {
    data: expenses,
    isLoading: expenseLoading,
    error: expenseError,
  } = getExpenses();
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-wrap m-2 justify-content-around">
        {[
          {
            count: expenses?.length || 0,
            title: "Expenses",
            loading: expenseLoading,
            error: expenseError,
            disabled: true,
          },
          {
            count: users?.length || 0,
            loading: usersLoading,
            error: userError,
            title: "Users",
          },
          {
            count: trips?.length || 0,
            title: "Trips",
            error: tripError,
            loading: tripLoading,
          },
        ].map(({ count, title, loading, error, to, disabled }, key) => (
          <Link
            to={disabled ? "#" : to || title}
            className="border d-flex justify-content-center align-items-center p-5 m-2 td-none"
            style={{ width: "45%" }}
            key={key}
          >
            <div className="d-flex flex-column align-items-center flex-grow-1">
              <h1>{count}</h1>
              <h4>{title}</h4>
            </div>

            {!disabled && (
              <div className="d-flex align-items-center">
                {!!count && <Icon value={"navigate_next"} />}
                {error && <Icon value={"error"} className="text-danger" />}
                {loading && <Icon value={"rotate_right"} className="rotate" />}
              </div>
            )}
          </Link>
        ))}
      </div>
      <div className="w-75 align-self-center">
        <Last90DaysTrip trips={trips} />
      </div>
    </div>
  );
};
