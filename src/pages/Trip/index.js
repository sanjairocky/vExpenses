import React, { useEffect } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";
import { getPathName } from "util";
import { getTripById } from "api/trips";

export default () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const { data: trip, loading, error } = getTripById();

  if (loading) return "Loading...,";

  if (error) return "trip not found";

  return outlet ? (
    outlet
  ) : (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center p-3">
        <div>trip: {trip.id}</div>
        <div>Expenses : {trip?.expenses?.length}</div>
        <div>Users : {trip?.users?.length}</div>
      </div>
      <div className="d-flex flex-wrap">
        <button
          className="p-5 w-50"
          onClick={() => navigate(getPathName(pathname, "expenses"))}
        >
          view expenses
        </button>
      </div>
    </div>
  );
};
