import { useParams } from "react-router-dom";
import { TripClient } from "../shared";
import { useAxios } from "../shared/useAxios";

export const getTrips = (props = {}) =>
  useAxios({ ...props, axios: TripClient, method: "get" });

export const getTripById = (props = {}) => {
  const { tripId } = useParams();
  return useAxios({
    ...props,
    axios: TripClient,
    method: "get",
    url: "/" + tripId,
  });
};

export const createTrip = (props = {}) =>
  useAxios({
    ...props,
    axios: TripClient,
    method: "post",
  });
