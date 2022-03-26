import React from "react";
import { getTripById } from "api/trips";
import { Table } from "components/Table";

export default () => {
  const { data: trip, isLoading, error } = getTripById();

  if (isLoading) return "Loading...,";

  if (error) return "trip not found";

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <div className="d-flex flex-column justify-content-center align-items-center w-75 align-self-center p-3 my-3 border shadow rounded">
        <h3>{`${trip.id} - ${trip.title}`}</h3>
        <h5 style={{ wordBreak: "break-word" }}>{trip.description}</h5>
      </div>
      <div className="m-3">
        <h4 className="mb-3">{`USERS - ${trip?.users?.length || 0} :`}</h4>
        <Table
          header={[
            { name: "Name", field: "name" },
            { name: "First Name", field: "firstName" },
            { name: "Last Name", field: "lastName" },
            { name: "Email Id", field: "email" },
            {
              name: "Author",
              render: ({ userTrip }) => (userTrip.author ? "Yes" : "NO"),
            },
          ]}
          rows={trip?.users}
          slno
          className="border-top"
        />
      </div>
    </div>
  );
};
