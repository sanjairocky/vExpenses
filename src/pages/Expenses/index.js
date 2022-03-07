import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getPathName } from "util";
import { useApp } from "context/app";

export default () => {
  const { pathname } = useLocation();
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [{ trips }] = useApp();
  const [trip, setTrip] = useState(trips.find(({ id }) => id === tripId));

  useEffect(() => {
    setTrip(trips.find(({ id }) => id === tripId));
  }, [tripId]);

  return (
    <>
      <div className="d-flex p-3 justify-content-end">
        <button onClick={() => navigate(getPathName(pathname, "add"))}>
          Add Expense
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {trip.expenses.map((expense, key) => (
          <Link
            key={key}
            className="w-50 p-3 td-none d-flex justify-content-center"
            to={getPathName(pathname, expense.id)}
          >
            {JSON.stringify(expense, null, 2)}
          </Link>
        ))}
      </div>
    </>
  );
};
