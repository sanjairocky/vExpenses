import { useState, useEffect } from "react";

export default ({
  onCompleted = () => {},
  onError = () => {},
  getData = () => {},
  lazy,
}) => {
  const [
    {
      error,
      loading,
      data,
      setData = (d) => {
        setState({ data: d });
      },
      setError = (e) => {
        setState({ error: e });
      },
    },
    setState,
  ] = useState({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!lazy)
      getData()
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError(error.request);
          } else {
            setError(error.message);
          }
        });
  }, []);

  useEffect(() => {
    if (data) onCompleted(data);
  }, [data]);

  useEffect(() => {
    if (error) onError(error);
  }, [error]);

  return [
    lazy ? [getData, { loading, data, error }] : { loading, data, error },
    {
      setData,
      setError,
    },
  ];
};
