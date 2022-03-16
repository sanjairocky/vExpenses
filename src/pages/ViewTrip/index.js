import React from "react";
import { getTripById } from "api/trips";
import { Table } from "components/Table";

export default () => {
  const { data: trip, isLoading, error } = getTripById();

  if (isLoading) return "Loading...,";

  if (error) return "trip not found";

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <div className="d-flex flex-column justify-content-center align-items-center w-50 align-self-center p-3 my-3 border shadow rounded">
        <div>TRIP : {trip.id}</div>
        <div>USERS : {trip?.users?.length}</div>
      </div>
      <Table
        header={[
          { name: "Name", field: "name" },
          { name: "First Name", field: "firstName" },
          { name: "Last Name", field: "lastName" },
          { name: "Email Id", field: "email" },
        ]}
        rows={trip?.users}
        slno
      />
    </div>
  );
};
