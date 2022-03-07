import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useOutlet,
  useParams,
} from "react-router-dom";
import { getPathName } from "util";
import { useApp } from "context/app";

export default () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ trips }] = useApp();
  const outlet = useOutlet();
  const getTrip = () => trips.find(({ id }) => id === tripId);
  const [trip, setTrip] = useState(getTrip());

  useEffect(() => {
    setTrip(getTrip());
  }, [tripId]);

  if (!trip) return "trip not found";

  return outlet ? (
    outlet
  ) : (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center p-3">
        <div>trip: {tripId}</div>
        <div>Expenses : {trip?.expenses?.length}</div>
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
