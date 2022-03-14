import React from "react";
import { Link, useLocation, useNavigate, useOutlet } from "react-router-dom";
import { getPathName } from "util";
import { getTrips } from "api/trips";
import Trip from "components/Trip";

export default () => {
  const { pathname } = useLocation();
  const { data: trips, isLoading, error } = getTrips();
  const child = useOutlet();

  if (isLoading) return "loading...";

  if (error) return "Error while fetching Trips";

  return child ? (
    child
  ) : (
    <div className="d-flex flex-column flex-grow-1 ">
      <div className="d-flex justify-content-end my-2 mx-4 text-primary">
        <Link to="add" className="material-icons p-3 border shadow td-none">
          add_location
        </Link>
      </div>
      <div className="d-flex flex-wrap ">
        {trips.map((trip, key) => (
          <Trip {...trip} key={key} />
        ))}
      </div>
    </div>
  );
};
