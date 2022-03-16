import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default ({ title, createdAt, id }) => {
  return (
    <Link
      className="d-flex border-bottom p-3 my-1 mx-3 td-none"
      to={String(id)}
    >
      <div className=" d-flex align-items-center rounded border mx-2 p-1">
        <h4>Trp</h4>
      </div>
      <div className="d-flex flex-column justify-content-center flex-grow-1 px-2">
        <span>{title}</span>
        <span>{`Created : ${moment(createdAt).calendar()}`}</span>
      </div>
    </Link>
  );
};
