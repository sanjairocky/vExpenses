import { useParams } from "react-router-dom";
import { useApiHook, ExpenseClient } from "../shared";
import expenseMockData from "../shared/mockdata";

export const getTrips = (props = {}) => {
  const getData = () => {
    if (PROFILE === "dev") {
      return Promise.resolve({
        data: expenseMockData.trips.map(({ expenses, users, ...trip }) => ({
          ...trip,
          expenses: expenses.length,
          users: users.length,
        })),
      });
    }
    return ExpenseClient.get("");
  };
  const [res] = useApiHook({
    ...props,
    getData,
  });

  return res;
};

export const getTripById = (props = {}) => {
  const { tripId } = useParams();
  const getData = () => {
    if (PROFILE === "dev") {
      return Promise.resolve({
        data: expenseMockData.trips
          .map(({ expenses, ...trip }) => ({
            ...trip,
            expenses: expenses.length,
          }))
          .find(({ id }) => id === tripId),
      });
    }
    return ExpenseClient.get("/" + tripId);
  };
  const [res] = useApiHook({
    ...props,
    getData,
  });
  return res;
};
