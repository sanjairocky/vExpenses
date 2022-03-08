import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPathName } from "util";
import { getTrips } from "api/trips";

export default () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: trips, loading, error } = getTrips();

  if (loading) return "loading...";

  if (error) return "Error while fetching Trips";

  return (
    <div className="d-flex flex-grow-1 position-relative">
      <div className="d-flex flex-wrap ">
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
      <Link
        to={getPathName(pathname, "add")}
        className="flex-center position-absolute z-index-2 rounded-circle bg-primary text-white p-3 td-none m-3"
        style={{ right: 0, bottom: 0 }}
      >
        +
      </Link>
    </div>
  );
};
