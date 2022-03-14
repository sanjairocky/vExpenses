import React from "react";

import { getUsers } from "api/users";
import User from "components/User";
import { Link } from "react-router-dom";

export default () => {
  const { data: users, isLoading, error, refetch } = getUsers();

  if (isLoading) return "loading...";

  if (error) return "Error while fetching Users";

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex justify-content-end my-2 mx-4 text-primary">
        <Link to="add" className="material-icons p-3 border shadow td-none ">
          person_add
        </Link>
      </div>
      <div className="d-flex flex-column overflow-y-scroll flex-grow-1">
        {users.map((u, key) => (
          <User {...u} key={key} />
        ))}
      </div>
    </div>
  );
};
