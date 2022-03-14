import React from "react";
import { Link } from "react-router-dom";

export default (trip) => {
  return (
    <Link
      className="w-50 p-3 td-none d-flex justify-content-center"
      to={String(trip.id)}
    >
      {JSON.stringify(trip, null, 3)}
    </Link>
  );
};
