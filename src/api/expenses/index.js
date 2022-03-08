import { useParams } from "react-router-dom";
import { useApiHook, ExpenseClient } from "../shared";
import expenseMockData from "../shared/mockdata";

export const getExpenses = (props = {}) => {
  const getData = () => {
    if (PROFILE === "dev") {
      return Promise.resolve({
        data: expenseMockData.trips.map(({ expenses, id }) => ({
          ...expenses,
          tripId: id,
        })),
      });
    }
    return ExpenseClient.get("/expenses");
  };
  const [res] = useApiHook({
    ...props,
    getData,
  });

  return res;
};

export const getExpensesByTripId = (props = {}) => {
  const { tripId } = useParams();
  const getData = () => {
    if (PROFILE === "dev") {
      const expenses =
        expenseMockData.trips.find(({ id }) => id === tripId)?.expenses || [];
      return Promise.resolve({
        data: expenses.map(({ participants, ...exp }) => ({
          ...exp,
          participants: participants?.length,
          tripId,
        })),
      });
    }
    return ExpenseClient.get("/" + tripId + "/expenses");
  };
  const [res] = useApiHook({
    ...props,
    getData,
  });
  return res;
};

export const getExpenseByExpenseIdAndTripId = (props = {}) => {
  const { tripId, expenseId } = useParams();
  const getData = () => {
    if (PROFILE === "dev") {
      const expense = (
        expenseMockData.trips.find(({ id }) => id === tripId)?.expenses || []
      ).find(({ id }) => id === expenseId);
      return Promise.resolve({
        data: { tripId, ...expense },
      });
    }
    return ExpenseClient.get("/" + tripId + "/expenses/" + expenseId);
  };
  const [res] = useApiHook({
    ...props,
    getData,
  });
  return res;
};
