import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getTrips } from "api/trips";
import Trip from "components/Trip";

export default () => {
  const { pathname } = useLocation();
  const { data: userTrips, isLoading, error } = getTrips();

  if (isLoading) return "loading...";

  if (error) return "Error while fetching Trips";

  return (
    <div className="d-flex flex-column flex-grow-1 ">
      <div className="d-flex justify-content-end my-2 mx-4 text-primary">
        <Link to="add" className="material-icons p-3 border shadow td-none">
          add_location
        </Link>
      </div>
      <div
        className="flex-grow-1 d-flex flex-column overflow-y-scroll"
        style={{ height: "70vh" }}
      >
        {userTrips?.trips?.map((trip, key) => (
          <Trip {...trip} key={key} />
        ))}
      </div>
    </div>
  );
};
