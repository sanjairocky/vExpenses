import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPathName } from "util";
import { useApp } from "context/app";

export default () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [{ trips = [] }] = useApp();
  return (
    <>
      <div className="d-flex justify-content-end p-3">
        <button onClick={() => navigate(getPathName(pathname, "add"))}>
          Add Trip
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {trips.map((trip, key) => (
          <Link
            key={key}
            className="w-50 p-3 td-none d-flex justify-content-center"
            to={getPathName(pathname, trip.id)}
          >
            {JSON.stringify(trip, null, 3)}
          </Link>
        ))}
      </div>
    </>
  );
};
