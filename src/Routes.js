import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Trips, CreateTrip, Home, Users, ViewTrip, CreateUser } from "pages";
import { useUser } from "context/app";
import { getUserByEmail, createUser } from "./api/users";

window.user1 =
  "eyJuYW1lIjoic2FuamFpIGt1bWFyIiwiZW1haWwiOiJ0YWxrMnNhbmphaWlAZ21haWwuY29tIiwibGFzdE5hbWUiOiJrdW1hciIsImZpcnN0TmFtZSI6InNhbmphaSIsImltYWdlVXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lIYmx6cHMwN1lmbUlBTEI3elIzUjZVbWtjbVR2ZE5DLWxFYVhtOGc9czk2LWMifQ==";

export default () => {
  const hideHeader =
    new URLSearchParams(window.location.search).get("header") === "false";
  const [user, setUser] = useUser();
  const [addUser] = createUser({
    lazy: true,
    onCompleted: (data) => setUser(data),
    onError: (e) => {
      setUser();
    },
  });
  const [getUser] = getUserByEmail({
    lazy: true,
    onCompleted: (data) => {
      if (data.length) {
        setUser(data[0]);
      } else {
        addUser({
          data: JSON.parse(
            window.atob(new URLSearchParams(window.location.search).get("user"))
          ),
        });
        console.log(
          "creating user",
          JSON.parse(
            window.atob(new URLSearchParams(window.location.search).get("user"))
          )
        );
      }
    },
    onError: (e) => {
      setUser();
    },
  });
  console.log(user, hideHeader);

  useEffect(() => {
    try {
      const data = JSON.parse(
        window.atob(new URLSearchParams(window.location.search).get("user"))
      );
      getUser({ params: { email: data.email } });
      setUser(data);
    } catch (e) {
      setUser();
    }
  }, [new URLSearchParams(window.location.search).get("user")]);

  const AddUser = () => {
    const { userId } = useParams();
    return userId;
  };

  if (!user)
    return (
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <span> 401 unauthorised</span>
        <span>
          Please visit
          <a href="https://vlog-planner.herokuapp.com/#/Expenses"> here</a>
        </span>
      </div>
    );
  if (user && !user.id)
    return (
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <span>{`Welcome onboard!, ${user.name}`}</span>
        <span> {`Please wait!...`}</span>
      </div>
    );
  return (
    <>
      {hideHeader || (
        <header className="p-2 bg-primary text-white shadow d-flex justify-content-center">
          <h5> Trip Expense Tracker</h5>
        </header>
      )}
      <Routes>
        <Route path="/">
          <Route element={<Home />} index />
          <Route path="users">
            <Route element={<Users />} index />
            <Route path=":userId" element={<AddUser />} />
            <Route path="add" element={<CreateUser />} />
          </Route>
          <Route path="trips">
            <Route index element={<Trips />} />
            <Route path="add" element={<CreateTrip />} />
            <Route path=":tripId" element={<ViewTrip />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
