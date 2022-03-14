import { useEffect, useReducer } from "react";

function axiosReducer(state, action) {
  switch (action.type) {
    case "error": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
      };
    }
    case "success": {
      return {
        ...state,
        status: "resolved",
        data: action.data,
      };
    }
    case "started": {
      return {
        ...state,
        status: "pending",
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/**
 fixed :
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/
export const useAxios = ({
  axios,
  onCompleted = () => {},
  onError = () => {},
  lazy = false,
  ...axiosParams
}) => {
  const [state, dispatch] = useReducer(axiosReducer, {
    status: "idle",
    data: null,
    error: null,
  });

  const fetchData = (newAxiosParams) => {
    dispatch({ type: "started" });
    axios.request({ ...axiosParams, ...newAxiosParams }).then(
      (response) => {
        dispatch({ type: "success", data: response.data });
        onCompleted(response.data);
      },
      (error) => {
        dispatch({ type: "error", error });
        onError(error);
      }
    );
  };

  useEffect(() => {
    if (!lazy) fetchData({});
  }, []); // execute once only

  return ((result) => (lazy ? [fetchData, result] : result))({
    isLoading: state.status === "idle" || state.status === "pending",
    isIdle: state.status === "idle",
    isPending: state.status === "pending",
    isResolved: state.status === "resolved",
    isRejected: state.status === "rejected",
    refetch: fetchData,
    ...state,
  });
};
